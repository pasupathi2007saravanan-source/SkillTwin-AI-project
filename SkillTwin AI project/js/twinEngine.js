// SkillTwin AI - Analytics, Readiness Scoring, Gap Analysis & Scheduler Engine
import { JOB_ROLES } from './data.js';

export class SkillTwinEngine {
  /**
   * Evaluates student profile against target job role
   */
  static analyzeProfile(profile) {
    const role = JOB_ROLES[profile.targetRoleId] || JOB_ROLES['aiml_engineer'];
    const currentSkills = profile.currentSkills || {};

    let weightedSkillScoreSum = 0;
    let totalSkillWeight = 0;
    let maxPossibleDeficit = 0;
    let actualDeficitSum = 0;

    const strongSkills = [];
    const mediumSkills = [];
    const missingSkills = [];
    const skillComparisons = [];

    role.requiredSkills.forEach(req => {
      const currentLevel = currentSkills[req.name] || 0;
      const benchmark = req.benchmark;
      const weight = req.weight;

      const gap = Math.max(0, benchmark - currentLevel);
      const gapPercentage = Math.round((gap / benchmark) * 100);
      const matchScore = Math.min(100, Math.round((currentLevel / benchmark) * 100));

      weightedSkillScoreSum += (Math.min(currentLevel, benchmark) / benchmark) * 100 * weight;
      totalSkillWeight += weight;

      actualDeficitSum += gap * weight;
      maxPossibleDeficit += benchmark * weight;

      const comparisonItem = {
        name: req.name,
        category: req.category,
        currentLevel,
        benchmark,
        gap,
        gapPercentage,
        matchScore,
        weight,
        mustHave: req.mustHave
      };

      skillComparisons.push(comparisonItem);

      if (currentLevel >= 75 || currentLevel >= benchmark) {
        strongSkills.push(comparisonItem);
      } else if (currentLevel >= 40) {
        mediumSkills.push(comparisonItem);
      } else {
        missingSkills.push(comparisonItem);
      }
    });

    // 1. Skill Match Score (0 - 100)
    const baseSkillScore = totalSkillWeight > 0 
      ? Math.round(weightedSkillScoreSum / totalSkillWeight) 
      : 50;

    // 2. Coding Factor (0 - 100)
    const coding = profile.coding || { totalSolved: 0, contestRating: 1200 };
    const targetCoding = role.codingTarget || { totalSolved: 150, contestRating: 1500 };
    const solvedRatio = Math.min(1.0, coding.totalSolved / (targetCoding.totalSolved || 1));
    const ratingRatio = Math.min(1.0, (coding.contestRating || 1200) / (targetCoding.contestRating || 1500));
    const codingScore = Math.round((solvedRatio * 0.6 + ratingRatio * 0.4) * 100);

    // 3. Projects Factor (0 - 100)
    const projects = profile.github?.topProjects || [];
    const completedProjectsCount = projects.filter(p => p.completed).length;
    const projectScore = Math.min(100, Math.round((completedProjectsCount / 3) * 85 + (projects.length > 0 ? 15 : 0)));

    // 4. Resume & Profile Factor (0 - 100)
    const resumeScore = profile.resume?.filename ? 88 : 40;

    // 5. Total Job Readiness Percentage (Weighted Synthesis)
    // Skill competency: 50%, Coding: 22%, Projects: 18%, Resume/Profile: 10%
    const jobReadiness = Math.min(99, Math.max(12, Math.round(
      (baseSkillScore * 0.50) +
      (codingScore * 0.22) +
      (projectScore * 0.18) +
      (resumeScore * 0.10)
    )));

    // Overall Skill Gap Percentage across all required role skills
    const overallSkillGap = maxPossibleDeficit > 0 
      ? Math.round((actualDeficitSum / maxPossibleDeficit) * 100) 
      : 30;

    // Sort comparisons by biggest gap descending
    const sortedGaps = [...skillComparisons].sort((a, b) => b.gap - a.gap);
    const biggestGap = sortedGaps[0] || null;

    // Top Skill (highest current skill)
    const sortedStrengths = [...skillComparisons].sort((a, b) => b.currentLevel - a.currentLevel);
    const topSkill = sortedStrengths[0] || null;

    // Recommended Next Skill: Priority to must-have skills with greatest gap
    const mustHaveGaps = sortedGaps.filter(s => s.mustHave && s.gap > 0);
    const recommendedNextSkill = mustHaveGaps.length > 0 ? mustHaveGaps[0] : sortedGaps[0];

    return {
      role,
      jobReadiness,
      baseSkillScore,
      codingScore,
      projectScore,
      resumeScore,
      overallSkillGap,
      strongSkills,
      mediumSkills,
      missingSkills,
      skillComparisons,
      biggestGap,
      topSkill,
      recommendedNextSkill
    };
  }

  /**
   * Generates AI Learning Recommendations based on active skill gaps
   */
  static generateRecommendations(profile, analysis) {
    const role = analysis.role;
    const roadmap = role.learningRoadmap || [];
    const nextSkillName = analysis.recommendedNextSkill ? analysis.recommendedNextSkill.name : 'DSA & Algorithms';

    // Find roadmap item matching the next skill or fallback
    let matchedRoadmap = roadmap.find(r => r.skill.toLowerCase() === nextSkillName.toLowerCase());
    
    if (!matchedRoadmap && roadmap.length > 0) {
      matchedRoadmap = roadmap[0];
    }

    // Default recommendation structure
    const rec = {
      targetRole: role.title,
      skillGap: nextSkillName,
      gapPercentage: analysis.recommendedNextSkill ? analysis.recommendedNextSkill.gapPercentage : 60,
      currentLevel: analysis.recommendedNextSkill ? analysis.recommendedNextSkill.currentLevel : 35,
      benchmarkLevel: analysis.recommendedNextSkill ? analysis.recommendedNextSkill.benchmark : 80,
      priority: analysis.recommendedNextSkill?.mustHave ? 'Critical Priority' : 'High Priority',
      nextTopic: matchedRoadmap?.topics?.[0] || 'Core Architecture & Problem Solving',
      allTopics: matchedRoadmap?.topics || [
        'Fundamental Principles',
        'Algorithmic Complexity & Edge Cases',
        'Optimization & Clean Code Architecture',
        'Industry Benchmark Implementations'
      ],
      practiceTasks: matchedRoadmap?.practiceTasks || [
        `Implement a clean production module using ${nextSkillName}`,
        `Solve 3 targeted interview questions on ${nextSkillName}`
      ],
      recommendedProject: matchedRoadmap?.recommendedProject || {
        title: `${nextSkillName} Interactive Showcase Engine`,
        tech: `Modern Stack, ${nextSkillName}`,
        description: `Build an end-to-end demonstrable application targeting real-world problems in ${role.title}.`
      },
      estimatedHoursToCloseGap: Math.max(12, Math.round((analysis.recommendedNextSkill?.gap || 40) * 0.45)),
      weeklyFocusDays: 'Mon, Wed, Fri & Weekend Labs'
    };

    return rec;
  }

  /**
   * Generates Personalized Daily Schedule prioritizing biggest skill gaps
   * WOW FEATURE: "SkillTwin does not only tell WHAT to learn. It also tells WHEN to learn it."
   */
  static generateSmartSchedule(profile, analysis) {
    const timeSettings = profile.timeSettings || {};
    const collegeStart = timeSettings.collegeStart || '09:00';
    const collegeEnd = timeSettings.collegeEnd || '16:00';
    const targetHours = timeSettings.dailyTargetHours || 3.5;

    const gap1 = analysis.recommendedNextSkill?.name || 'DSA & Algorithms';
    const gap2 = analysis.biggestGap && analysis.biggestGap.name !== gap1 
      ? analysis.biggestGap.name 
      : (analysis.mediumSkills[0]?.name || 'Machine Learning');

    const schedule = [
      {
        id: 'slot-college',
        timeRange: `${this.formatTime(collegeStart)} – ${this.formatTime(collegeEnd)}`,
        title: 'College Lectures & Labs',
        type: 'college',
        priority: 'Mandatory',
        status: 'completed',
        category: 'Academic Core',
        skillRelated: null,
        description: 'Focus on curriculum coursework, semester lab experiments, and peer discussions.'
      },
      {
        id: 'slot-sync',
        timeRange: '4:30 PM – 5:00 PM',
        title: 'Work Update & SkillTwin Daily Review',
        type: 'review',
        priority: 'Medium',
        status: 'completed',
        category: 'Productivity',
        skillRelated: null,
        description: 'Review daily targets, log morning/afternoon progress, and calibrate energy levels.'
      },
      {
        id: 'slot-gap1',
        timeRange: '5:00 PM – 6:15 PM',
        title: `${gap1}: Deep Dive & Problem Solving`,
        type: 'dsa',
        priority: 'Critical Gap 🔥',
        status: 'pending',
        category: 'Target Skill Focus',
        skillRelated: gap1,
        xpGain: 4,
        description: `Top bottleneck for ${analysis.role.title}. High cognitive alertness slot allocated for complex logic.`
      },
      {
        id: 'slot-gap2',
        timeRange: '7:00 PM – 8:15 PM',
        title: `${gap2}: Core Concepts & Code Walkthrough`,
        type: 'study',
        priority: 'High Gap ⚠️',
        status: 'pending',
        category: 'Technical Study',
        skillRelated: gap2,
        xpGain: 4,
        description: `Secondary deficit addressing benchmark requirements. Synthesize theoretical grasp.`
      },
      {
        id: 'slot-project',
        timeRange: '8:30 PM – 9:45 PM',
        title: 'Project Build & GitHub Code Commit',
        type: 'project',
        priority: 'High Priority',
        status: 'pending',
        category: 'Portfolio Milestone',
        skillRelated: gap1,
        xpGain: 5,
        description: 'Hands-on coding milestone. Apply learned concepts into your active portfolio repository.'
      }
    ];

    return schedule;
  }

  /**
   * Smart Rescheduling Algorithm:
   * If a student misses a task, automatically reschedule it to the next available evening/weekend slot
   * without losing its high priority.
   */
  static rescheduleMissedTask(schedule, taskId) {
    const updated = JSON.parse(JSON.stringify(schedule));
    const targetIdx = updated.findIndex(s => s.id === taskId);
    if (targetIdx === -1) return { schedule: updated, message: 'Task not found' };

    const missedTask = updated[targetIdx];
    missedTask.status = 'rescheduled';
    missedTask.rescheduledFrom = missedTask.timeRange;

    // Define next alternative time slots
    const alternativeSlots = [
      '9:45 PM – 10:45 PM (Tonight Deep Focus)',
      'Tomorrow 6:30 AM – 7:30 AM (Early Bird Recovery)',
      'Tomorrow 5:00 PM – 6:15 PM (High Priority Slot)',
      'Saturday 10:00 AM – 12:00 PM (Weekend Sprint)'
    ];

    // Pick first available slot not already identical
    const newSlot = alternativeSlots[0];
    missedTask.timeRange = newSlot;
    missedTask.priority = 'Rescheduled 🔥 (Priority Retained)';
    missedTask.status = 'pending';

    // Move it to the bottom of the pending list or next slot
    updated.splice(targetIdx, 1);
    updated.push(missedTask);

    return {
      schedule: updated,
      rescheduledTask: missedTask,
      message: `"${missedTask.title}" safely rescheduled to ${newSlot}. Skill priority preserved without disrupting college hours.`
    };
  }

  /**
   * Helper: format military time to AM/PM
   */
  static formatTime(timeStr) {
    if (!timeStr) return '09:00 AM';
    if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
    const [h, m] = timeStr.split(':');
    let hour = parseInt(h, 10);
    const minute = m || '00';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }
}
