# 🧬 SkillTwin AI – Your AI-Powered Digital Skill Twin

> **“SkillTwin does not only tell WHAT to learn. It also tells WHEN to learn it.”**

SkillTwin AI is an intelligent student career copilot that constructs a continuous digital twin of a student's technical abilities, projects, coding track record, resume, and target career aspiration. It calculates quantitative job-readiness scores, discovers critical skill bottlenecks, recommends high-impact projects, and automatically schedules daily learning sessions around college timetables with dynamic missed-task rescheduling.

---

## 🚀 Key Modules & Architecture

### 1. Student Profile & Resume Intelligence
- **Profile Management:** Student Name, Department, Academic Year, Target Job Role, and Bio.
- **Resume Extractor:** Drag-and-drop or file upload parser with keyword heuristic extraction mapping to a 20+ skill industry ontology.
- **Coding Performance:** LeetCode solved metrics (Easy/Medium/Hard breakdown), contest ratings, and global percentile ranking.
- **Portfolio Projects:** Repository counts, commit activity, featured projects, and tech tags.

### 2. AI Skill Twin Matrix
- **Competency Categorization:**
  - **Strong Skills (>= 75% or benchmark):** Displayed with `✅` indicators.
  - **Medium Skills (40% - 74%):** Displayed with `⚠️` indicators.
  - **Missing / Critical Skills (< 40%):** Displayed with `❌` indicators.
- **Interactive Visualizations:**
  - **Radar Skill Matrix:** Compares student's current twin directly against role hiring benchmarks.
  - **Job Readiness Gauge:** Real-time synthesis of skills (50%), coding practice (22%), portfolio projects (18%), and resume depth (10%).
  - **Deficit Bar Chart:** Quantifies exact deficit points needed to reach hiring readiness.

### 3. AI Learning Recommendations
- **Bottleneck Diagnosis:** Identifies the single biggest skill bottleneck holding back candidate readiness.
- **Curated Learning Roadmap:**
  - Next topics to study.
  - Practical coding challenges & interview problems.
  - Recommended capstone portfolio project with technical architecture.
  - Estimated hours required to close the deficit.
- **Deep-Dive Career Advisor:** Generates structured markdown blueprints via Built-in AI or live Google Gemini API.

### 4. AI Time Management & Personalized Daily Schedule
- **Context-Aware Timetable:** Seamlessly coordinates around college hours (e.g., 9:00 AM – 4:00 PM) and evening peak cognitive slots.
- **Automatic Gap Prioritization:** Allocates prime study slots directly to the student's highest-deficit skills (e.g., DSA & Machine Learning).
- **⚡ Smart Rescheduling Engine:** When a student misses a session, 1-click **"Missed? Auto-Reschedule"** reallocates the task to the next available window without demoting its priority.
- **Continuous Closed-Loop Feedback:** Checking off completed sessions immediately awards skill XP, permanently updating the SkillTwin readiness score in real-time.

---

## 🛠️ Technology Stack

- **Frontend:** Vanilla HTML5, Modern CSS (Glassmorphism, custom cybernetic dark mode, CSS custom properties, responsive grid & flexbox), ES Modules JavaScript.
- **Visuals:** [Chart.js](https://www.chartjs.org/) for radar, doughnut, and bar charts; [Lucide Icons](https://lucide.dev/) for crisp vector iconography.
- **AI Abstraction Layer:** `AIService` supporting offline Neural Heuristics Engine and plug-and-play Google Gemini API key integration.
- **State & Storage:** `StorageManager` with HTML5 LocalStorage persistence and demo presets.

---

## 🏃 Running the Application

SkillTwin AI is running locally on:
```bash
http://localhost:3000
```

To run manually or on any other port:
```powershell
python -m http.server 3000
```
or open `index.html` directly in any modern web browser (Chrome, Edge, Firefox, Brave).
