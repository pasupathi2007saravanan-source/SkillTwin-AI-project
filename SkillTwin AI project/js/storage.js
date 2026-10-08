// SkillTwin AI - State & Storage Manager

const STORAGE_KEY = 'skilltwin_ai_student_profile_v1';

export const DEFAULT_PROFILES = {
  'pasupathi_aiml': {
    name: 'Pasupathi S',
    department: 'Information Technology',
    year: '3rd Year B.Tech',
    college: 'Engineering College',
    targetRoleId: 'aiml_engineer',
    bio: 'Passionate about intelligent systems, deep neural architectures, and scaling data-driven applications.',
    github: {
      url: 'https://github.com/pasupathi-dev',
      reposCount: 16,
      contributionsLastYear: 412,
      topProjects: [
        {
          id: 'proj-1',
          name: 'Traffic Sign CNN Classifier',
          tech: 'Python, PyTorch, OpenCV',
          stars: 12,
          level: 'Intermediate',
          completed: true,
          date: '2026-08-15'
        },
        {
          id: 'proj-2',
          name: 'Smart Document RAG Agent',
          tech: 'Python, LangChain, ChromaDB',
          stars: 28,
          level: 'Intermediate',
          completed: true,
          date: '2026-09-20'
        },
        {
          id: 'proj-3',
          name: 'College IV Travel Planner',
          tech: 'JavaScript, Leaflet, HTML/CSS',
          stars: 8,
          level: 'Beginner',
          completed: true,
          date: '2026-10-02'
        }
      ]
    },
    coding: {
      platform: 'LeetCode',
      username: 'pasupathi_codes',
      totalSolved: 142,
      easy: 70,
      medium: 62,
      hard: 10,
      contestRating: 1520,
      globalRank: 'Top 18%'
    },
    currentSkills: {
      'Python': 82,
      'Machine Learning': 45,
      'DSA & Algorithms': 38,
      'Deep Learning': 35,
      'PyTorch / TensorFlow': 30,
      'SQL & Database': 65,
      'Git & Version Control': 78,
      'Data Preprocessing & Pandas': 68,
      'Model Deployment & MLOps': 25,
      'System Design': 20
    },
    resume: {
      filename: 'Pasupathi_Resume_2026.pdf',
      uploadedAt: '2026-10-05T14:20:00Z',
      extractedSkillsCount: 9,
      rawSummary: 'Undergraduate student with experience in Python programming, machine learning basics, convolutional neural networks, and relational database systems. Built smart RAG agent and computer vision classification pipelines.'
    },
    timeSettings: {
      collegeStart: '09:00',
      collegeEnd: '16:00',
      dailyTargetHours: 3.5,
      commuteAndBuffer: '4:00 PM - 4:30 PM',
      eveningStart: '16:30',
      nightEnd: '22:30',
      currentSchedule: [
        {
          id: 'sched-1',
          timeRange: '9:00 AM – 4:00 PM',
          title: 'College Lectures & Labs',
          type: 'college',
          priority: 'Mandatory',
          status: 'completed',
          category: 'Academic',
          skillRelated: null
        },
        {
          id: 'sched-2',
          timeRange: '4:30 PM – 5:00 PM',
          title: 'Work Update & Daily Goal Review',
          type: 'review',
          priority: 'Medium',
          status: 'completed',
          category: 'Productivity',
          skillRelated: null
        },
        {
          id: 'sched-3',
          timeRange: '5:00 PM – 6:00 PM',
          title: 'DSA Practice: Binary Trees & BFS',
          type: 'dsa',
          priority: 'Critical Gap',
          status: 'pending',
          category: 'Coding & Algorithms',
          skillRelated: 'DSA & Algorithms',
          xpGain: 3
        },
        {
          id: 'sched-4',
          timeRange: '7:00 PM – 8:00 PM',
          title: 'Machine Learning: Regularization & XGBoost',
          type: 'study',
          priority: 'High Gap',
          status: 'pending',
          category: 'Core AI',
          skillRelated: 'Machine Learning',
          xpGain: 4
        },
        {
          id: 'sched-5',
          timeRange: '8:00 PM – 9:00 PM',
          title: 'Project Build: Churn Prediction Pipeline',
          type: 'project',
          priority: 'High',
          status: 'pending',
          category: 'Portfolio Project',
          skillRelated: 'Machine Learning',
          xpGain: 5
        }
      ]
    },
    activityLog: [
      { id: 'act-1', text: 'Completed "College Lectures & Labs"', timestamp: '2026-10-07 16:00' },
      { id: 'act-2', text: 'Reviewed daily goals & synced SkillTwin', timestamp: '2026-10-07 16:32' },
      { id: 'act-3', text: 'Parsed resume: 9 skills indexed into Twin', timestamp: '2026-10-05 14:21' }
    ]
  },

  'ananya_fullstack': {
    name: 'Ananya Roy',
    department: 'Computer Science & Engineering',
    year: '4th Year B.Tech',
    college: 'Tech Institute',
    targetRoleId: 'fullstack_dev',
    bio: 'Full stack enthusiast focusing on modern React architectures, performant REST APIs, and microservice containers.',
    github: {
      url: 'https://github.com/ananya-web',
      reposCount: 22,
      contributionsLastYear: 580,
      topProjects: [
        {
          id: 'proj-f1',
          name: 'TaskFlow Realtime Kanban',
          tech: 'React, Node.js, Socket.io',
          stars: 34,
          level: 'Advanced',
          completed: true,
          date: '2026-07-10'
        },
        {
          id: 'proj-f2',
          name: 'DevBook Social Network API',
          tech: 'Express, MongoDB, JWT',
          stars: 19,
          level: 'Intermediate',
          completed: true,
          date: '2026-09-02'
        }
      ]
    },
    coding: {
      platform: 'LeetCode',
      username: 'ananya_leetcode',
      totalSolved: 175,
      easy: 95,
      medium: 70,
      hard: 10,
      contestRating: 1565,
      globalRank: 'Top 14%'
    },
    currentSkills: {
      'JavaScript / TypeScript': 84,
      'React / Next.js': 78,
      'Node.js & Express': 72,
      'HTML & Modern CSS': 88,
      'REST APIs & GraphQL': 74,
      'SQL & PostgreSQL': 55,
      'DSA & Algorithms': 62,
      'System Design & Auth': 42,
      'Docker & DevOps Basics': 30,
      'Git & GitHub Workflow': 80
    },
    resume: {
      filename: 'Ananya_FullStack_Resume.pdf',
      uploadedAt: '2026-10-06T11:00:00Z',
      extractedSkillsCount: 11,
      rawSummary: 'Final year CSE undergraduate with strong React, Node.js, and TypeScript fundamentals. Built collaborative fullstack applications.'
    },
    timeSettings: {
      collegeStart: '09:30',
      collegeEnd: '16:30',
      dailyTargetHours: 4.0,
      commuteAndBuffer: '4:30 PM - 5:00 PM',
      eveningStart: '17:00',
      nightEnd: '23:00',
      currentSchedule: [
        {
          id: 'sched-f1',
          timeRange: '9:30 AM – 4:30 PM',
          title: 'College & Major Project Review',
          type: 'college',
          priority: 'Mandatory',
          status: 'completed',
          category: 'Academic',
          skillRelated: null
        },
        {
          id: 'sched-f2',
          timeRange: '5:00 PM – 6:15 PM',
          title: 'System Design: Redis Caching & RBAC',
          type: 'study',
          priority: 'Critical Gap',
          status: 'pending',
          category: 'Architecture',
          skillRelated: 'System Design & Auth',
          xpGain: 4
        },
        {
          id: 'sched-f3',
          timeRange: '6:30 PM – 7:45 PM',
          title: 'Docker & Microservices Orchestration',
          type: 'study',
          priority: 'Critical Gap',
          status: 'pending',
          category: 'DevOps',
          skillRelated: 'Docker & DevOps Basics',
          xpGain: 5
        },
        {
          id: 'sched-f4',
          timeRange: '8:30 PM – 10:00 PM',
          title: 'PostgreSQL Advanced Indexing Queries',
          type: 'practice',
          priority: 'High Gap',
          status: 'pending',
          category: 'Database',
          skillRelated: 'SQL & PostgreSQL',
          xpGain: 3
        }
      ]
    },
    activityLog: [
      { id: 'act-f1', text: 'Checked off College & Major Project Review', timestamp: '2026-10-07 16:30' }
    ]
  }
};

export class StorageManager {
  static getProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using default profile', e);
    }
    // Return default Pasupathi profile
    const defaultData = JSON.parse(JSON.stringify(DEFAULT_PROFILES['pasupathi_aiml']));
    this.saveProfile(defaultData);
    return defaultData;
  }

  static saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  static loadPreset(presetKey) {
    if (DEFAULT_PROFILES[presetKey]) {
      const cloned = JSON.parse(JSON.stringify(DEFAULT_PROFILES[presetKey]));
      this.saveProfile(cloned);
      return cloned;
    }
    return null;
  }

  static resetToDefault() {
    const fresh = JSON.parse(JSON.stringify(DEFAULT_PROFILES['pasupathi_aiml']));
    this.saveProfile(fresh);
    return fresh;
  }
}
