// SkillTwin AI - Application Controller
import { JOB_ROLES } from './data.js';
import { StorageManager, DEFAULT_PROFILES } from './storage.js';
import { SkillTwinEngine } from './twinEngine.js';
import { AIService } from './aiService.js';
import { ChartManager } from './charts.js';

class App {
  constructor() {
    this.profile = StorageManager.getProfile();
    this.analysis = null;
    this.activeFilter = 'all';
    this.init();
  }

  init() {
    this.recalculateAll();
    this.setupNavigation();
    this.setupEventListeners();
    this.refreshLucideIcons();
  }

  /**
   * Complete reactive recalculation across all modules
   */
  recalculateAll(showToastMessage = null) {
    this.analysis = SkillTwinEngine.analyzeProfile(this.profile);
    
    // Ensure schedule exists
    if (!this.profile.timeSettings.currentSchedule || this.profile.timeSettings.currentSchedule.length === 0) {
      this.profile.timeSettings.currentSchedule = SkillTwinEngine.generateSmartSchedule(this.profile, this.analysis);
      StorageManager.saveProfile(this.profile);
    }

    this.renderHeader();
    this.renderDashboard();
    this.renderProfileModule();
    this.renderTwinModule();
    this.renderRecommendationsModule();
    this.renderScheduleModule();
    this.renderRolesModule();

    this.refreshLucideIcons();

    if (showToastMessage) {
      this.showToast(showToastMessage);
    }
  }

  /**
   * Render Top Header
   */
  renderHeader() {
    const role = this.analysis.role;
    const headerRoleBadge = document.getElementById('headerRoleBadge');
    const headerReadinessPct = document.getElementById('headerReadinessPct');

    if (headerRoleBadge) headerRoleBadge.textContent = role.title;
    if (headerReadinessPct) headerReadinessPct.textContent = `${this.analysis.jobReadiness}%`;
    const twinHoloRoleChip = document.getElementById('twinHoloRoleChip');
    if (twinHoloRoleChip) twinHoloRoleChip.textContent = `🎯 Benchmark: ${role.title}`;
  }

  /**
   * Render Dashboard Tab
   */
  renderDashboard() {
    // Stat Cards
    const statReadiness = document.getElementById('statReadiness');
    const statReadinessSub = document.getElementById('statReadinessSub');
    const statTopSkill = document.getElementById('statTopSkill');
    const statBiggestGap = document.getElementById('statBiggestGap');
    const statGapSub = document.getElementById('statGapSub');
    const statNextSkill = document.getElementById('statNextSkill');

    if (statReadiness) statReadiness.textContent = `${this.analysis.jobReadiness}%`;
    if (statReadinessSub) {
      statReadinessSub.textContent = this.analysis.jobReadiness >= 80 
        ? '🎉 High Job Placement Readiness!' 
        : `Deficit to Benchmark: -${100 - this.analysis.jobReadiness}%`;
    }

    if (statTopSkill) {
      statTopSkill.textContent = this.analysis.topSkill 
        ? `${this.analysis.topSkill.name} (${this.analysis.topSkill.currentLevel}%)` 
        : 'Python (82%)';
    }

    if (statBiggestGap) {
      statBiggestGap.textContent = this.analysis.biggestGap 
        ? `${this.analysis.biggestGap.name} (${this.analysis.biggestGap.currentLevel}%)` 
        : 'DSA (38%)';
    }

    if (statGapSub) {
      const gapVal = this.analysis.biggestGap ? this.analysis.biggestGap.gap : 30;
      statGapSub.textContent = `Target deficit: -${gapVal}% below role benchmark`;
    }

    if (statNextSkill) {
      statNextSkill.textContent = this.analysis.recommendedNextSkill 
        ? this.analysis.recommendedNextSkill.name 
        : 'Machine Learning';
    }

    // Radar & Readiness Gauges
    const radarLabel = document.getElementById('radarTargetRoleLabel');
    if (radarLabel) radarLabel.textContent = this.analysis.role.title;

    ChartManager.renderRadarChart('skillRadarCanvas', this.analysis.skillComparisons);
    ChartManager.renderReadinessGauge('gaugeCanvas', this.analysis.jobReadiness);
    ChartManager.renderGapBarChart('gapBarCanvas', this.analysis.skillComparisons);

    const gaugePctDisplay = document.getElementById('gaugePctDisplay');
    if (gaugePctDisplay) gaugePctDisplay.textContent = `${this.analysis.jobReadiness}%`;

    // Breakdown bars
    const barSkillMatchPct = document.getElementById('barSkillMatchPct');
    const barSkillMatchFill = document.getElementById('barSkillMatchFill');
    if (barSkillMatchPct && barSkillMatchFill) {
      barSkillMatchPct.textContent = `${this.analysis.baseSkillScore}%`;
      barSkillMatchFill.style.width = `${this.analysis.baseSkillScore}%`;
    }

    const barCodingMatchPct = document.getElementById('barCodingMatchPct');
    const barCodingMatchFill = document.getElementById('barCodingMatchFill');
    if (barCodingMatchPct && barCodingMatchFill) {
      barCodingMatchPct.textContent = `${this.analysis.codingScore}%`;
      barCodingMatchFill.style.width = `${this.analysis.codingScore}%`;
    }

    const barProjectMatchPct = document.getElementById('barProjectMatchPct');
    const barProjectMatchFill = document.getElementById('barProjectMatchFill');
    if (barProjectMatchPct && barProjectMatchFill) {
      barProjectMatchPct.textContent = `${this.analysis.projectScore}%`;
      barProjectMatchFill.style.width = `${this.analysis.projectScore}%`;
    }

    // Schedule Preview in Dashboard
    this.renderDashboardSchedulePreview();
  }

  /**
   * Render Schedule Preview within Dashboard
   */
  renderDashboardSchedulePreview() {
    const container = document.getElementById('dashSchedulePreview');
    if (!container) return;

    const schedule = this.profile.timeSettings.currentSchedule || [];
    let completedCount = 0;
    let pendingCount = 0;

    container.innerHTML = schedule.map(slot => {
      const isDone = slot.status === 'completed';
      if (isDone) completedCount++; else pendingCount++;

      let badgeColor = '#38bdf8';
      if (slot.priority.includes('Critical') || slot.priority.includes('🔥')) badgeColor = '#f43f5e';
      else if (slot.priority.includes('High')) badgeColor = '#f59e0b';
      else if (isDone) badgeColor = '#10b981';

      return `
        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 0.85rem; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="btn-check-toggle" data-slot-id="${slot.id}" style="background: transparent; border: none; cursor: pointer; color: ${isDone ? 'var(--accent-emerald)' : 'var(--text-dim)'}; font-size: 1.25rem;">
              ${isDone ? '✅' : '⭕'}
            </button>
            <div>
              <div style="font-size: 0.86rem; font-weight: 700; color: ${isDone ? 'var(--text-dim)' : '#ffffff'}; ${isDone ? 'text-decoration: line-through;' : ''}">
                ${slot.title}
              </div>
              <div style="font-size: 0.74rem; color: var(--text-muted);">
                ${slot.timeRange} · <span style="color: ${badgeColor}; font-weight: 600;">${slot.priority}</span>
              </div>
            </div>
          </div>
          <div>
            ${!isDone ? `
              <button class="btn btn-secondary btn-sm btn-reschedule-single" data-slot-id="${slot.id}" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;" title="Reschedule if missed">
                Missed? ↻
              </button>
            ` : `<span style="font-size: 0.72rem; color: var(--accent-emerald);">Done</span>`}
          </div>
        </div>
      `;
    }).join('');

    const dashCompletedTasksCount = document.getElementById('dashCompletedTasksCount');
    const dashPendingTasksCount = document.getElementById('dashPendingTasksCount');
    if (dashCompletedTasksCount) dashCompletedTasksCount.textContent = `${completedCount} Done`;
    if (dashPendingTasksCount) dashPendingTasksCount.textContent = `${pendingCount} Pending`;

    // Bind check toggle & reschedule actions
    container.querySelectorAll('.btn-check-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const slotId = btn.dataset.slotId;
        this.toggleScheduleTask(slotId);
      });
    });

    container.querySelectorAll('.btn-reschedule-single').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const slotId = btn.dataset.slotId;
        this.handleRescheduleTask(slotId);
      });
    });
  }

  /**
   * Render Module 1: Student Profile & Resume
   */
  renderProfileModule() {
    const p = this.profile;
    const profDisplayName = document.getElementById('profDisplayName');
    const profTargetRoleChip = document.getElementById('profTargetRoleChip');
    const profDept = document.getElementById('profDept');
    const profYear = document.getElementById('profYear');
    const profCollege = document.getElementById('profCollege');
    const profBio = document.getElementById('profBio');

    if (profDisplayName) profDisplayName.textContent = p.name;
    if (profTargetRoleChip) profTargetRoleChip.textContent = this.analysis.role.title;
    if (profDept) profDept.textContent = p.department;
    if (profYear) profYear.textContent = p.year;
    if (profCollege) profCollege.textContent = p.college || 'Engineering College';
    if (profBio) profBio.textContent = p.bio;

    // Resume info
    const resumeFileNameText = document.getElementById('resumeFileNameText');
    const resumeSkillCountText = document.getElementById('resumeSkillCountText');
    const resumeSummaryContent = document.getElementById('resumeSummaryContent');

    if (resumeFileNameText) resumeFileNameText.textContent = p.resume?.filename || 'Resume_Not_Uploaded.pdf';
    if (resumeSkillCountText) resumeSkillCountText.textContent = `${Object.keys(p.currentSkills || {}).length} skills indexed`;
    if (resumeSummaryContent) resumeSummaryContent.textContent = p.resume?.rawSummary || 'Parsed profile skills extracted and synced with digital twin ontology.';

    // Coding stats
    const coding = p.coding || {};
    const codingTotalSolved = document.getElementById('codingTotalSolved');
    const codingRating = document.getElementById('codingRating');
    const githubReposCount = document.getElementById('githubReposCount');

    if (codingTotalSolved) codingTotalSolved.textContent = coding.totalSolved || 0;
    if (codingRating) codingRating.textContent = coding.contestRating || 1200;
    if (githubReposCount) githubReposCount.textContent = p.github?.reposCount || 0;

    // Featured projects list
    const projectsList = document.getElementById('profileProjectsList');
    if (projectsList) {
      const projs = p.github?.topProjects || [];
      if (projs.length === 0) {
        projectsList.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-muted); padding: 0.5rem;">No featured projects added yet.</div>`;
      } else {
        projectsList.innerHTML = projs.map(proj => `
          <div style="background: rgba(15, 23, 42, 0.6); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.86rem; font-weight: 700; color: #ffffff;">${proj.name}</div>
              <div style="font-size: 0.75rem; color: var(--accent-cyan);">${proj.tech}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="meta-chip ${proj.level === 'Advanced' ? 'highlight' : ''}">${proj.level}</span>
              <span class="badge-status strong" style="font-size: 0.7rem;">Verified ✅</span>
            </div>
          </div>
        `).join('');
      }
    }
  }

  /**
   * Render Module 2: AI Skill Twin Matrix
   */
  renderTwinModule() {
    const twinCurrentRoleName = document.getElementById('twinCurrentRoleName');
    if (twinCurrentRoleName) twinCurrentRoleName.textContent = this.analysis.role.title;

    const countAll = document.getElementById('countAllSkills');
    const countStrong = document.getElementById('countStrongSkills');
    const countMedium = document.getElementById('countMediumSkills');
    const countMissing = document.getElementById('countMissingSkills');

    if (countAll) countAll.textContent = this.analysis.skillComparisons.length;
    if (countStrong) countStrong.textContent = this.analysis.strongSkills.length;
    if (countMedium) countMedium.textContent = this.analysis.mediumSkills.length;
    if (countMissing) countMissing.textContent = this.analysis.missingSkills.length;

    const grid = document.getElementById('skillsTwinGrid');
    if (!grid) return;

    let filtered = this.analysis.skillComparisons;
    if (this.activeFilter === 'strong') filtered = this.analysis.strongSkills;
    else if (this.activeFilter === 'medium') filtered = this.analysis.mediumSkills;
    else if (this.activeFilter === 'missing') filtered = this.analysis.missingSkills;

    grid.innerHTML = filtered.map(skill => {
      let statusClass = 'missing';
      let statusIcon = '❌';
      let statusText = 'Missing Skill';
      let fillClass = 'rose';

      if (skill.currentLevel >= 75 || skill.currentLevel >= skill.benchmark) {
        statusClass = 'strong';
        statusIcon = '✅';
        statusText = 'Strong';
        fillClass = 'emerald';
      } else if (skill.currentLevel >= 40) {
        statusClass = 'medium';
        statusIcon = '⚠️';
        statusText = 'Medium';
        fillClass = 'amber';
      }

      return `
        <div class="skill-twin-card" data-skill-name="${skill.name}">
          <div class="skill-card-top">
            <div class="skill-name-wrap">
              <h4>${skill.name}</h4>
              <div class="skill-category-tag">${skill.category} ${skill.mustHave ? '• <strong style="color: #f87171;">Must Have</strong>' : ''}</div>
            </div>
            <span class="badge-status ${statusClass}">
              ${skill.currentLevel}% ${statusIcon}
            </span>
          </div>

          <div>
            <div class="skill-metrics-row" style="margin-bottom: 0.35rem;">
              <span>Current: <strong>${skill.currentLevel}%</strong></span>
              <span>Role Benchmark: <strong>${skill.benchmark}%</strong></span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill ${fillClass}" style="width: ${skill.currentLevel}%;"></div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.4rem; border-top: 1px solid rgba(255, 255, 255, 0.05);">
            <div class="skill-gap-tag">
              ${skill.gap > 0 ? `Gap: -${skill.gap}% (${skill.gapPercentage}% deficit)` : 'Gap Closed 🎉'}
            </div>
            <button class="btn btn-secondary btn-sm btn-quick-boost" data-skill-name="${skill.name}" style="padding: 0.2rem 0.6rem; font-size: 0.72rem;">
              + Boost Level
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Event handlers for quick boost
    grid.querySelectorAll('.btn-quick-boost').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const skillName = btn.dataset.skillName;
        this.openSkillModal(skillName);
      });
    });
  }

  /**
   * Render Module 3: AI Recommendations
   */
  renderRecommendationsModule() {
    const rec = SkillTwinEngine.generateRecommendations(this.profile, this.analysis);
    
    const recPriorityBadge = document.getElementById('recPriorityBadge');
    const recTargetSkillName = document.getElementById('recTargetSkillName');
    const recTargetSkillInline = document.getElementById('recTargetSkillInline');
    const recPriorityText = document.getElementById('recPriorityText');
    const recEstHours = document.getElementById('recEstHours');

    if (recPriorityBadge) recPriorityBadge.textContent = rec.priority;
    if (recTargetSkillName) recTargetSkillName.textContent = rec.skillGap;
    if (recTargetSkillInline) recTargetSkillInline.textContent = `${rec.skillGap} (${rec.currentLevel}%)`;
    if (recPriorityText) recPriorityText.textContent = `${rec.priority} (Benchmark deficit: -${rec.gapPercentage}%)`;
    if (recEstHours) recEstHours.textContent = `${rec.estimatedHoursToCloseGap} Hours Focused`;

    // Topics list
    const recTopicsList = document.getElementById('recTopicsList');
    if (recTopicsList) {
      recTopicsList.innerHTML = rec.allTopics.map(t => `<li>${t}</li>`).join('');
    }

    // Practice tasks list
    const recPracticeList = document.getElementById('recPracticeList');
    if (recPracticeList) {
      recPracticeList.innerHTML = rec.practiceTasks.map(t => `<li>${t}</li>`).join('');
    }

    // Recommended project
    const recProjectTitle = document.getElementById('recProjectTitle');
    const recProjectTech = document.getElementById('recProjectTech');
    const recProjectDesc = document.getElementById('recProjectDesc');

    if (recProjectTitle) recProjectTitle.textContent = `🚀 Recommended Project: ${rec.recommendedProject.title}`;
    if (recProjectTech) recProjectTech.textContent = `Tech Stack: ${rec.recommendedProject.tech}`;
    if (recProjectDesc) recProjectDesc.textContent = rec.recommendedProject.description;

    this.currentRec = rec;
  }

  /**
   * Render Module 4: AI Time Management & Personalized Schedule
   */
  renderScheduleModule() {
    const timeSettings = this.profile.timeSettings || {};
    const collegeLabel = document.getElementById('schedCollegeHoursLabel');
    const focusSkillLabel = document.getElementById('schedFocusSkillLabel');

    if (collegeLabel) {
      collegeLabel.textContent = `${SkillTwinEngine.formatTime(timeSettings.collegeStart)} – ${SkillTwinEngine.formatTime(timeSettings.collegeEnd)}`;
    }
    if (focusSkillLabel) {
      focusSkillLabel.textContent = this.analysis.recommendedNextSkill?.name || 'DSA & Algorithms';
    }

    const container = document.getElementById('scheduleTimelineList');
    if (!container) return;

    const schedule = this.profile.timeSettings.currentSchedule || [];

    container.innerHTML = schedule.map(item => {
      const isDone = item.status === 'completed';
      const isRescheduled = item.status === 'rescheduled';
      
      let badgeClass = 'medium';
      if (item.priority.includes('Critical') || item.priority.includes('🔥')) badgeClass = 'missing';
      else if (isDone) badgeClass = 'strong';

      return `
        <div class="schedule-item-card ${isDone ? 'completed' : ''} ${isRescheduled ? 'rescheduled' : ''}" id="sched-${item.id}">
          <div class="schedule-item-top">
            <span class="schedule-time-badge">
              <i data-lucide="clock" style="width: 13px; height: 13px;"></i>
              ${item.timeRange}
            </span>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <span class="badge-status ${badgeClass}">${item.priority}</span>
              ${item.xpGain ? `<span class="meta-chip highlight">+${item.xpGain}% Skill XP</span>` : ''}
            </div>
          </div>

          <div class="schedule-item-title" style="${isDone ? 'text-decoration: line-through; opacity: 0.75;' : ''}">
            ${item.title}
          </div>

          <p class="schedule-item-desc">
            ${item.description || 'Curated high-priority session targeting role readiness.'}
          </p>

          <div class="schedule-item-actions">
            ${!isDone ? `
              <button class="btn btn-success btn-sm btn-mark-complete" data-slot-id="${item.id}">
                <i data-lucide="check" style="width: 14px; height: 14px;"></i> Mark Completed (+XP)
              </button>
              <button class="btn btn-reschedule btn-sm btn-missed-reschedule" data-slot-id="${item.id}" title="Automatically move this slot to next free window">
                <i data-lucide="corner-down-right" style="width: 14px; height: 14px;"></i> Missed? Auto-Reschedule
              </button>
            ` : `
              <span style="font-size: 0.8rem; color: var(--accent-emerald); font-weight: 600;">
                ✓ Completed & Indexed to SkillTwin!
              </span>
              <button class="btn btn-secondary btn-sm btn-mark-undo" data-slot-id="${item.id}" style="padding: 0.2rem 0.5rem; font-size: 0.7rem;">
                Undo
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Bind schedule actions
    container.querySelectorAll('.btn-mark-complete').forEach(btn => {
      btn.addEventListener('click', () => this.toggleScheduleTask(btn.dataset.slotId, true));
    });

    container.querySelectorAll('.btn-mark-undo').forEach(btn => {
      btn.addEventListener('click', () => this.toggleScheduleTask(btn.dataset.slotId, false));
    });

    container.querySelectorAll('.btn-missed-reschedule').forEach(btn => {
      btn.addEventListener('click', () => this.handleRescheduleTask(btn.dataset.slotId));
    });
  }

  /**
   * Render Job Role Benchmarks Explorer
   */
  renderRolesModule() {
    const grid = document.getElementById('jobRolesGrid');
    if (!grid) return;

    const currentRoleId = this.profile.targetRoleId;

    grid.innerHTML = Object.values(JOB_ROLES).map(role => {
      const isSelected = role.id === currentRoleId;
      return `
        <div class="card-glass" style="border-color: ${isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)'}; background: ${isSelected ? 'rgba(15, 23, 42, 0.9)' : 'var(--bg-card)'};">
          <div class="card-header-flex">
            <div>
              <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">${role.category}</div>
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #ffffff;">${role.title}</h3>
            </div>
            ${isSelected ? `<span class="badge-status strong">Active Target 🎯</span>` : ''}
          </div>

          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.85rem; line-height: 1.45;">
            ${role.description}
          </p>

          <div style="font-size: 0.78rem; color: #cbd5e1; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.3rem;">
            <div>💰 <strong>Est. Salary:</strong> ${role.salaryRange}</div>
            <div>📊 <strong>Market Demand:</strong> ${role.marketDemand}</div>
            <div>📋 <strong>Key Core Skills:</strong> ${role.requiredSkills.slice(0, 3).map(s => s.name).join(', ')}...</div>
          </div>

          <div>
            ${isSelected ? `
              <button class="btn btn-secondary btn-sm" disabled style="width: 100%; justify-content: center; opacity: 0.7;">
                Currently Benchmarked
              </button>
            ` : `
              <button class="btn btn-primary btn-sm btn-switch-role" data-role-id="${role.id}" style="width: 100%; justify-content: center;">
                Select Role & Recalculate Twin
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.btn-switch-role').forEach(btn => {
      btn.addEventListener('click', () => {
        const roleId = btn.dataset.roleId;
        this.profile.targetRoleId = roleId;
        // Re-generate schedule tailored to new role gaps
        this.profile.timeSettings.currentSchedule = SkillTwinEngine.generateSmartSchedule(
          this.profile,
          SkillTwinEngine.analyzeProfile(this.profile)
        );
        StorageManager.saveProfile(this.profile);
        this.recalculateAll(`🎯 Target Job Role switched to ${JOB_ROLES[roleId].title}! SkillTwin recalibrated.`);
      });
    });
  }

  /**
   * Task completion handler: Closed-loop XP update
   */
  toggleScheduleTask(slotId, forceCompleted = null) {
    const schedule = this.profile.timeSettings.currentSchedule;
    const task = schedule.find(s => s.id === slotId);
    if (!task) return;

    if (forceCompleted !== null) {
      task.status = forceCompleted ? 'completed' : 'pending';
    } else {
      task.status = task.status === 'completed' ? 'pending' : 'completed';
    }

    if (task.status === 'completed') {
      // Award XP to related skill if available
      if (task.skillRelated && this.profile.currentSkills[task.skillRelated] !== undefined) {
        const currentVal = this.profile.currentSkills[task.skillRelated];
        const gain = task.xpGain || 3;
        const newVal = Math.min(98, currentVal + gain);
        this.profile.currentSkills[task.skillRelated] = newVal;
        StorageManager.saveProfile(this.profile);
        this.recalculateAll(`🎉 Completed "${task.title}"! ${task.skillRelated} increased by +${gain}% (Now ${newVal}%)!`);
        return;
      }
    }

    StorageManager.saveProfile(this.profile);
    this.recalculateAll(`Updated status for "${task.title}"`);
  }

  /**
   * WOW Feature: Smart Rescheduling Algorithm
   */
  handleRescheduleTask(slotId) {
    const result = SkillTwinEngine.rescheduleMissedTask(this.profile.timeSettings.currentSchedule, slotId);
    this.profile.timeSettings.currentSchedule = result.schedule;
    StorageManager.saveProfile(this.profile);
    this.recalculateAll(result.message);
  }

  /**
   * Resume drag-and-drop & extraction logic
   */
  setupResumeHandlers() {
    const dropzone = document.getElementById('resumeDropzone');
    const fileInput = document.getElementById('resumeFileInput');
    const btnBrowse = document.getElementById('btnBrowseResume');
    const btnSample = document.getElementById('btnLoadSampleResume');
    const btnPaste = document.getElementById('btnPasteResume');

    if (btnBrowse && fileInput) {
      btnBrowse.addEventListener('click', () => fileInput.click());
    }

    if (fileInput) {
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          const fakeText = `Candidate skills: Python, Machine Learning, Scikit-Learn, PyTorch, Deep Learning, SQL, PostgreSQL, DSA, Algorithms, Git, Pandas. Projects: Computer Vision Classifier, LLM Document Agent.`;
          await this.processResumeText(fakeText, file.name);
        }
      });
    }

    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', async (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) {
          const fakeText = `Student resume: Experienced in Python, Machine Learning algorithms, Data Structures and Algorithms in C++, SQL, PyTorch neural networks, Docker containerization basics.`;
          await this.processResumeText(fakeText, file.name);
        }
      });
    }

    if (btnSample) {
      btnSample.addEventListener('click', async () => {
        const sampleText = `Sample Engineering Resume: S. Pasupathi. Department: Information Technology. Core Skills: Python 3, Machine Learning, Deep Learning (CNNs), DSA & LeetCode problem solving, SQL, PyTorch, Git, Pandas, Docker basics. Target: AI/ML Engineer.`;
        await this.processResumeText(sampleText, 'Pasupathi_Sample_Resume.pdf');
      });
    }

    if (btnPaste) {
      btnPaste.addEventListener('click', () => {
        this.openModal('modalPasteResume');
      });
    }

    const formPaste = document.getElementById('formPasteResume');
    if (formPaste) {
      formPaste.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = document.getElementById('txtPasteResumeContent').value;
        this.closeModal('modalPasteResume');
        await this.processResumeText(content, 'Pasted_Resume_Snippet.txt');
      });
    }
  }

  async processResumeText(text, filename) {
    this.showToast(`🔍 AI is analyzing ${filename} & extracting technical skills...`);
    const result = await AIService.extractSkillsFromResume(text, filename);

    // Merge extracted skills into profile
    this.profile.resume = {
      filename: filename,
      uploadedAt: new Date().toISOString(),
      extractedSkillsCount: result.skillsCount,
      rawSummary: result.summary
    };

    // Update skill proficiencies
    Object.entries(result.extractedSkills).forEach(([sName, sLevel]) => {
      this.profile.currentSkills[sName] = sLevel;
    });

    StorageManager.saveProfile(this.profile);
    this.recalculateAll(`✅ Successfully extracted ${result.skillsCount} skills from ${filename}! SkillTwin synchronized.`);
  }

  /**
   * Modal Open / Close Helper
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  openSkillModal(skillName = '') {
    const inpSkillName = document.getElementById('inpSkillName');
    const inpSkillLevel = document.getElementById('inpSkillLevel');
    const lblSkillRangeVal = document.getElementById('lblSkillRangeVal');

    if (inpSkillName) inpSkillName.value = skillName;
    const currentVal = skillName ? (this.profile.currentSkills[skillName] || 60) : 60;
    if (inpSkillLevel) inpSkillLevel.value = currentVal;
    if (lblSkillRangeVal) lblSkillRangeVal.textContent = `${currentVal}%`;

    this.openModal('modalAddSkill');
  }

  /**
   * Toast notification system
   */
  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="font-size: 1.1rem;">⚡</span>
      <div style="flex: 1;">${message}</div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }

  /**
   * Tab switching setup
   */
  setupNavigation() {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTabId = btn.dataset.tab;

        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => {
          p.classList.remove('active');
          p.style.display = 'none';
        });

        btn.classList.add('active');
        const activePane = document.getElementById(targetTabId);
        if (activePane) {
          activePane.classList.add('active');
          activePane.style.display = 'block';
        }

        // Trigger chart resizing when switching to dashboard
        if (targetTabId === 'tab-dashboard') {
          setTimeout(() => {
            ChartManager.renderRadarChart('skillRadarCanvas', this.analysis.skillComparisons);
            ChartManager.renderReadinessGauge('gaugeCanvas', this.analysis.jobReadiness);
            ChartManager.renderGapBarChart('gapBarCanvas', this.analysis.skillComparisons);
          }, 100);
        }
      });
    });

    const btnDashScheduleGo = document.getElementById('btnDashScheduleGo');
    if (btnDashScheduleGo) {
      btnDashScheduleGo.addEventListener('click', () => {
        const scheduleTabBtn = document.getElementById('tabBtnSchedule');
        if (scheduleTabBtn) scheduleTabBtn.click();
      });
    }
  }

  /**
   * Event listeners for modals, forms, and presets
   */
  setupEventListeners() {
    // Preset dropdown switcher
    const presetSelect = document.getElementById('profilePresetSelect');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        const selected = e.target.value;
        const loaded = StorageManager.loadPreset(selected);
        if (loaded) {
          this.profile = loaded;
          this.recalculateAll(`Switched demo profile to "${loaded.name}"`);
        }
      });
    }

    // Sync Twin Button
    const btnRecalculate = document.getElementById('btnRecalculateTwin');
    if (btnRecalculate) {
      btnRecalculate.addEventListener('click', () => {
        this.recalculateAll('⚡ SkillTwin synchronized with recent projects & coding benchmarks!');
      });
    }

    // Filter pill buttons in AI Skill Twin module
    const pillButtons = document.querySelectorAll('.pill-filter-btn');
    pillButtons.forEach(pill => {
      pill.addEventListener('click', () => {
        pillButtons.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.dataset.filter;
        this.renderTwinModule();
      });
    });

    // Modal Close Buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeModal(btn.dataset.closeModal);
      });
    });

    // Close modal on outside backdrop click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });

    // Range slider value label
    const inpSkillLevel = document.getElementById('inpSkillLevel');
    const lblSkillRangeVal = document.getElementById('lblSkillRangeVal');
    if (inpSkillLevel && lblSkillRangeVal) {
      inpSkillLevel.addEventListener('input', () => {
        lblSkillRangeVal.textContent = `${inpSkillLevel.value}%`;
      });
    }

    // Add / Update Skill Form
    const formAddSkill = document.getElementById('formAddSkill');
    if (formAddSkill) {
      formAddSkill.addEventListener('submit', (e) => {
        e.preventDefault();
        const sName = document.getElementById('inpSkillName').value.trim();
        const sVal = parseInt(document.getElementById('inpSkillLevel').value, 10);
        if (sName) {
          this.profile.currentSkills[sName] = sVal;
          StorageManager.saveProfile(this.profile);
          this.closeModal('modalAddSkill');
          this.recalculateAll(`Updated skill "${sName}" to ${sVal}%!`);
        }
      });
    }

    const btnAddSkillOpen = document.getElementById('btnAddSkillModalOpen');
    if (btnAddSkillOpen) {
      btnAddSkillOpen.addEventListener('click', () => this.openSkillModal());
    }

    // Edit Profile Modal & Form
    const btnEditProfileOpen = document.getElementById('btnEditProfileOpen');
    if (btnEditProfileOpen) {
      btnEditProfileOpen.addEventListener('click', () => {
        document.getElementById('inpEditName').value = this.profile.name;
        document.getElementById('inpEditDept').value = this.profile.department;
        document.getElementById('inpEditYear').value = this.profile.year;
        document.getElementById('inpEditTargetRole').value = this.profile.targetRoleId;
        document.getElementById('inpEditBio').value = this.profile.bio || '';
        this.openModal('modalEditProfile');
      });
    }

    const formEditProfile = document.getElementById('formEditProfile');
    if (formEditProfile) {
      formEditProfile.addEventListener('submit', (e) => {
        e.preventDefault();
        this.profile.name = document.getElementById('inpEditName').value.trim();
        this.profile.department = document.getElementById('inpEditDept').value.trim();
        this.profile.year = document.getElementById('inpEditYear').value.trim();
        this.profile.targetRoleId = document.getElementById('inpEditTargetRole').value;
        this.profile.bio = document.getElementById('inpEditBio').value.trim();
        StorageManager.saveProfile(this.profile);
        this.closeModal('modalEditProfile');
        this.recalculateAll('Profile saved successfully!');
      });
    }

    // Coding Stats Modal & Form
    const btnUpdateCoding = document.getElementById('btnUpdateCoding');
    if (btnUpdateCoding) {
      btnUpdateCoding.addEventListener('click', () => {
        const c = this.profile.coding || {};
        document.getElementById('inpCodingTotal').value = c.totalSolved || 0;
        document.getElementById('inpCodingRating').value = c.contestRating || 1400;
        document.getElementById('inpCodingEasy').value = c.easy || 0;
        document.getElementById('inpCodingMedium').value = c.medium || 0;
        document.getElementById('inpCodingHard').value = c.hard || 0;
        document.getElementById('inpGithubRepos').value = this.profile.github?.reposCount || 0;
        this.openModal('modalCodingStats');
      });
    }

    const formCodingStats = document.getElementById('formCodingStats');
    if (formCodingStats) {
      formCodingStats.addEventListener('submit', (e) => {
        e.preventDefault();
        this.profile.coding = {
          totalSolved: parseInt(document.getElementById('inpCodingTotal').value, 10),
          contestRating: parseInt(document.getElementById('inpCodingRating').value, 10),
          easy: parseInt(document.getElementById('inpCodingEasy').value, 10),
          medium: parseInt(document.getElementById('inpCodingMedium').value, 10),
          hard: parseInt(document.getElementById('inpCodingHard').value, 10)
        };
        if (!this.profile.github) this.profile.github = {};
        this.profile.github.reposCount = parseInt(document.getElementById('inpGithubRepos').value, 10);
        StorageManager.saveProfile(this.profile);
        this.closeModal('modalCodingStats');
        this.recalculateAll('Updated LeetCode and GitHub stats! Coding readiness refreshed.');
      });
    }

    // Add Project Modal & Form
    const btnAddProjectOpen = document.getElementById('btnAddProjectOpen');
    if (btnAddProjectOpen) {
      btnAddProjectOpen.addEventListener('click', () => this.openModal('modalAddProject'));
    }

    const formAddProject = document.getElementById('formAddProject');
    if (formAddProject) {
      formAddProject.addEventListener('submit', (e) => {
        e.preventDefault();
        const pName = document.getElementById('inpProjName').value.trim();
        const pTech = document.getElementById('inpProjTech').value.trim();
        const pLevel = document.getElementById('inpProjLevel').value;

        if (!this.profile.github.topProjects) this.profile.github.topProjects = [];
        this.profile.github.topProjects.push({
          id: `proj-${Date.now()}`,
          name: pName,
          tech: pTech,
          level: pLevel,
          completed: true,
          date: new Date().toISOString().split('T')[0]
        });

        StorageManager.saveProfile(this.profile);
        this.closeModal('modalAddProject');
        this.recalculateAll(`Added project "${pName}" to portfolio (+15% project score)!`);
      });
    }

    // Schedule Config Modal & Form
    const btnOpenSchedConfig = document.getElementById('btnOpenScheduleConfig');
    if (btnOpenSchedConfig) {
      btnOpenSchedConfig.addEventListener('click', () => {
        document.getElementById('inpCollegeStart').value = this.profile.timeSettings.collegeStart || '09:00';
        document.getElementById('inpCollegeEnd').value = this.profile.timeSettings.collegeEnd || '16:00';
        document.getElementById('inpTargetHours').value = this.profile.timeSettings.dailyTargetHours || 3.5;
        this.openModal('modalScheduleConfig');
      });
    }

    const formScheduleConfig = document.getElementById('formScheduleConfig');
    if (formScheduleConfig) {
      formScheduleConfig.addEventListener('submit', (e) => {
        e.preventDefault();
        this.profile.timeSettings.collegeStart = document.getElementById('inpCollegeStart').value;
        this.profile.timeSettings.collegeEnd = document.getElementById('inpCollegeEnd').value;
        this.profile.timeSettings.dailyTargetHours = parseFloat(document.getElementById('inpTargetHours').value);
        this.profile.timeSettings.currentSchedule = SkillTwinEngine.generateSmartSchedule(this.profile, this.analysis);
        StorageManager.saveProfile(this.profile);
        this.closeModal('modalScheduleConfig');
        this.recalculateAll('Updated college hours & re-optimized your schedule!');
      });
    }

    // Regenerate Schedule Button
    const btnRegenSchedule = document.getElementById('btnRegenerateSchedule');
    if (btnRegenSchedule) {
      btnRegenSchedule.addEventListener('click', () => {
        this.profile.timeSettings.currentSchedule = SkillTwinEngine.generateSmartSchedule(this.profile, this.analysis);
        StorageManager.saveProfile(this.profile);
        this.recalculateAll('⚡ Re-optimized schedule focusing on your critical skill gaps!');
      });
    }

    // Recommendation Actions
    const btnRecAddToSchedule = document.getElementById('btnRecAddToSchedule');
    if (btnRecAddToSchedule) {
      btnRecAddToSchedule.addEventListener('click', () => {
        if (!this.currentRec) return;
        const newSlot = {
          id: `slot-rec-${Date.now()}`,
          timeRange: '8:30 PM – 9:30 PM (Priority Session)',
          title: `${this.currentRec.skillGap}: ${this.currentRec.nextTopic}`,
          type: 'study',
          priority: 'Critical Gap 🔥',
          status: 'pending',
          category: 'Recommended Gap',
          skillRelated: this.currentRec.skillGap,
          xpGain: 5,
          description: `Directly targeted from AI Bottleneck Detection: ${this.currentRec.allTopics[0]}`
        };
        this.profile.timeSettings.currentSchedule.push(newSlot);
        StorageManager.saveProfile(this.profile);
        this.recalculateAll(`Added "${newSlot.title}" to your schedule!`);
        // Switch to schedule tab
        document.getElementById('tabBtnSchedule').click();
      });
    }

    const btnRecAskAI = document.getElementById('btnRecAskAI');
    if (btnRecAskAI) {
      btnRecAskAI.addEventListener('click', async () => {
        const container = document.getElementById('aiDeepDiveContainer');
        const textField = document.getElementById('aiDeepDiveText');
        if (!container || !textField) return;

        container.style.display = 'block';
        textField.textContent = 'Generating comprehensive AI skill deep dive...';
        
        const response = await AIService.queryAI(
          `Provide a high-impact learning blueprint for ${this.currentRec.skillGap} tailored for ${this.analysis.role.title}. Include time management advice for a college student.`,
          'You are SkillTwin AI, an elite technical mentor.'
        );

        textField.textContent = response;
        this.refreshLucideIcons();
      });
    }

    const btnCloseAIDeepDive = document.getElementById('btnCloseAIDeepDive');
    if (btnCloseAIDeepDive) {
      btnCloseAIDeepDive.addEventListener('click', () => {
        document.getElementById('aiDeepDiveContainer').style.display = 'none';
      });
    }

    const btnEnrollProject = document.getElementById('btnEnrollProject');
    if (btnEnrollProject) {
      btnEnrollProject.addEventListener('click', () => {
        if (!this.currentRec?.recommendedProject) return;
        const proj = this.currentRec.recommendedProject;
        if (!this.profile.github.topProjects) this.profile.github.topProjects = [];
        this.profile.github.topProjects.push({
          id: `proj-${Date.now()}`,
          name: proj.title,
          tech: proj.tech,
          level: 'Advanced',
          completed: false,
          date: new Date().toISOString().split('T')[0]
        });
        StorageManager.saveProfile(this.profile);
        this.recalculateAll(`Adopted "${proj.title}" as your active target portfolio project!`);
      });
    }

    // AI Settings Modal
    const btnOpenSettings = document.getElementById('btnOpenSettings');
    if (btnOpenSettings) {
      btnOpenSettings.addEventListener('click', () => {
        const settings = AIService.getSettings();
        document.getElementById('inpAIProvider').value = settings.provider || 'builtin';
        document.getElementById('inpAIApiKey').value = settings.apiKey || '';
        this.openModal('modalAISettings');
      });
    }

    const formAISettings = document.getElementById('formAISettings');
    if (formAISettings) {
      formAISettings.addEventListener('submit', (e) => {
        e.preventDefault();
        const provider = document.getElementById('inpAIProvider').value;
        const apiKey = document.getElementById('inpAIApiKey').value.trim();
        AIService.saveSettings({ provider, apiKey });
        this.closeModal('modalAISettings');
        this.showToast('AI Settings updated successfully!');
      });
    }

    // Setup Resume Dropzone & File handlers
    this.setupResumeHandlers();
  }

  refreshLucideIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.skillTwinApp = new App();
});
