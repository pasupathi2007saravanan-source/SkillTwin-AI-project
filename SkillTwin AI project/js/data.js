// SkillTwin AI - Job Roles & Skills Ontology Database

export const JOB_ROLES = {
  'aiml_engineer': {
    id: 'aiml_engineer',
    title: 'AI / Machine Learning Engineer',
    category: 'Artificial Intelligence',
    icon: 'cpu',
    description: 'Builds, trains, and deploys predictive machine learning models and deep neural networks to production.',
    salaryRange: '$95k - $160k / ₹12 - 28 LPA',
    marketDemand: 'Very High (🔥 96%)',
    requiredSkills: [
      { name: 'Python', benchmark: 85, weight: 1.0, category: 'Core Programming', mustHave: true },
      { name: 'Machine Learning', benchmark: 80, weight: 1.2, category: 'AI/Data', mustHave: true },
      { name: 'Deep Learning', benchmark: 75, weight: 1.1, category: 'AI/Data', mustHave: true },
      { name: 'DSA & Algorithms', benchmark: 70, weight: 0.9, category: 'CS Fundamentals', mustHave: true },
      { name: 'PyTorch / TensorFlow', benchmark: 75, weight: 1.0, category: 'Frameworks', mustHave: true },
      { name: 'Data Preprocessing & Pandas', benchmark: 80, weight: 0.8, category: 'AI/Data', mustHave: false },
      { name: 'Model Deployment & MLOps', benchmark: 65, weight: 0.8, category: 'System & Cloud', mustHave: false },
      { name: 'SQL & Database', benchmark: 65, weight: 0.7, category: 'Data Storage', mustHave: false },
      { name: 'Git & Version Control', benchmark: 75, weight: 0.6, category: 'Engineering Tools', mustHave: false },
      { name: 'System Design', benchmark: 60, weight: 0.7, category: 'Architecture', mustHave: false }
    ],
    codingTarget: {
      totalSolved: 180,
      easy: 80,
      medium: 80,
      hard: 20,
      contestRating: 1550
    },
    learningRoadmap: [
      {
        skill: 'Machine Learning',
        topics: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'Gradient Boosting (XGBoost)', 'Model Evaluation & Cross-Validation'],
        practiceTasks: ['Implement Gradient Descent from scratch in NumPy', 'Fine-tune Hyperparameters using Optuna on Kaggle Titanic'],
        recommendedProject: {
          title: 'Predictive Customer Churn & Lifetime Value Engine',
          tech: 'Python, Scikit-Learn, FastAPI, Streamlit',
          description: 'End-to-end ML pipeline with data cleaning, feature engineering, automated model selection, and FastAPI inference endpoint.'
        },
        priority: 'High'
      },
      {
        skill: 'Deep Learning',
        topics: ['Backpropagation & Computational Graphs', 'CNNs for Vision', 'Transformers & Attention Mechanism', 'Transfer Learning'],
        practiceTasks: ['Train a custom ResNet on CIFAR-10 with data augmentation', 'Implement Self-Attention head in PyTorch'],
        recommendedProject: {
          title: 'Multimodal Semantic Document Intelligence System',
          tech: 'PyTorch, Hugging Face, OpenCV, Docker',
          description: 'Extracts tabular & textual insights from financial PDFs using fine-tuned vision-language transformers.'
        },
        priority: 'High'
      },
      {
        skill: 'DSA & Algorithms',
        topics: ['Tree Traversals (BFS/DFS)', 'Dynamic Programming basics', 'Graph shortest paths', 'Sliding Window'],
        practiceTasks: ['Solve 3 LeetCode Mediums on Graphs', 'Optimize LeetCode 300: Longest Increasing Subsequence'],
        recommendedProject: {
          title: 'Real-time A* Pathfinding Visualizer with Heuristic Comparison',
          tech: 'JavaScript / Python, Graph Algorithms',
          description: 'Interactive grid simulation demonstrating Dijkstra, A*, and Bidirectional Search performance metrics.'
        },
        priority: 'Medium'
      },
      {
        skill: 'Model Deployment & MLOps',
        topics: ['FastAPI REST Serving', 'Dockerizing ML Models', 'ONNX Runtime Optimization', 'GitHub Actions CI/CD'],
        practiceTasks: ['Package an ONNX model inside a Docker container with sub-30ms latency', 'Set up automated model testing in GitHub Actions'],
        recommendedProject: {
          title: 'Automated MLOps Monitoring Pipeline',
          tech: 'Docker, FastAPI, Prometheus, Grafana, MLflow',
          description: 'Production-ready model serving system with drift detection, latency tracking, and automatic fallback.'
        },
        priority: 'Medium'
      }
    ]
  },

  'fullstack_dev': {
    id: 'fullstack_dev',
    title: 'Full Stack Web Developer',
    category: 'Web Development',
    icon: 'layers',
    description: 'Designs, architects, and builds complete web applications from responsive frontend interfaces to scalable backend APIs.',
    salaryRange: '$85k - $145k / ₹10 - 24 LPA',
    marketDemand: 'Extremely High (🔥 98%)',
    requiredSkills: [
      { name: 'JavaScript / TypeScript', benchmark: 85, weight: 1.1, category: 'Core Programming', mustHave: true },
      { name: 'React / Next.js', benchmark: 80, weight: 1.1, category: 'Frontend', mustHave: true },
      { name: 'Node.js & Express', benchmark: 80, weight: 1.0, category: 'Backend', mustHave: true },
      { name: 'DSA & Algorithms', benchmark: 70, weight: 0.9, category: 'CS Fundamentals', mustHave: true },
      { name: 'SQL & PostgreSQL', benchmark: 75, weight: 0.8, category: 'Database', mustHave: true },
      { name: 'REST APIs & GraphQL', benchmark: 80, weight: 0.8, category: 'Backend', mustHave: true },
      { name: 'System Design & Auth', benchmark: 65, weight: 0.8, category: 'Architecture', mustHave: false },
      { name: 'HTML & Modern CSS', benchmark: 85, weight: 0.7, category: 'Frontend', mustHave: false },
      { name: 'Docker & DevOps Basics', benchmark: 60, weight: 0.6, category: 'System & Cloud', mustHave: false },
      { name: 'Git & GitHub Workflow', benchmark: 80, weight: 0.6, category: 'Engineering Tools', mustHave: false }
    ],
    codingTarget: {
      totalSolved: 160,
      easy: 80,
      medium: 70,
      hard: 10,
      contestRating: 1500
    },
    learningRoadmap: [
      {
        skill: 'System Design & Auth',
        topics: ['JWT vs Session Cookies', 'Role-Based Access Control (RBAC)', 'Database Indexing & Caching with Redis', 'Load Balancing & Rate Limiting'],
        practiceTasks: ['Build a refresh token rotation auth flow with Redis blacklisting', 'Implement rate-limiting middleware in Express'],
        recommendedProject: {
          title: 'Collaborative Kanban & Workspace Platform',
          tech: 'React, Node.js, WebSockets, Redis, PostgreSQL',
          description: 'Real-time multi-user task management suite with live updates, team RBAC, and optimistic UI updates.'
        },
        priority: 'High'
      },
      {
        skill: 'DSA & Algorithms',
        topics: ['HashMap & Two Pointers', 'Binary Search & Intervals', 'LinkedList & Stacks', 'Trees & Recursion'],
        practiceTasks: ['Solve 5 Array/Two Pointer problems', 'Implement an LRU Cache (LeetCode 146)'],
        recommendedProject: {
          title: 'In-Memory Cache & Key-Value Store with TTL',
          tech: 'Node.js / TypeScript, Doubly Linked List',
          description: 'Custom key-value store supporting LRU eviction, hash indexing, and disk persistence snapshots.'
        },
        priority: 'High'
      },
      {
        skill: 'Docker & DevOps Basics',
        topics: ['Dockerfile Multi-Stage Builds', 'Docker Compose Orchestration', 'Reverse Proxy with NGINX', 'CI/CD Pipelines'],
        practiceTasks: ['Dockerize a fullstack app with frontend, backend, and PostgreSQL in docker-compose.yml', 'Set up GitHub Actions to run tests and build images'],
        recommendedProject: {
          title: 'Microservices E-Commerce Prototype',
          tech: 'Node.js, Docker Compose, PostgreSQL, Nginx',
          description: 'Decomposed auth, product catalog, and order services interacting over internal REST and container network.'
        },
        priority: 'Medium'
      }
    ]
  },

  'data_scientist': {
    id: 'data_scientist',
    title: 'Data Scientist & Analytics Specialist',
    category: 'Data Science',
    icon: 'bar-chart-2',
    description: 'Extracts actionable business intelligence, builds probabilistic forecasts, and communicates insights through data storytelling.',
    salaryRange: '$90k - $150k / ₹11 - 25 LPA',
    marketDemand: 'High (🔥 92%)',
    requiredSkills: [
      { name: 'Python', benchmark: 85, weight: 1.0, category: 'Core Programming', mustHave: true },
      { name: 'SQL & Advanced Analytics', benchmark: 85, weight: 1.2, category: 'Database', mustHave: true },
      { name: 'Statistics & Probability', benchmark: 80, weight: 1.1, category: 'Math', mustHave: true },
      { name: 'Machine Learning', benchmark: 75, weight: 1.0, category: 'AI/Data', mustHave: true },
      { name: 'Data Visualization & BI', benchmark: 80, weight: 0.9, category: 'Analytics', mustHave: true },
      { name: 'Pandas & NumPy', benchmark: 85, weight: 0.9, category: 'AI/Data', mustHave: true },
      { name: 'A/B Testing & Experimentation', benchmark: 70, weight: 0.8, category: 'Product Data', mustHave: false },
      { name: 'DSA & Algorithms', benchmark: 60, weight: 0.6, category: 'CS Fundamentals', mustHave: false }
    ],
    codingTarget: {
      totalSolved: 120,
      easy: 70,
      medium: 45,
      hard: 5,
      contestRating: 1400
    },
    learningRoadmap: [
      {
        skill: 'Statistics & Probability',
        topics: ['Hypothesis Testing (t-tests, ANOVA, Chi-square)', 'Bayesian Inference', 'Confidence Intervals', 'P-value hacking pitfalls'],
        practiceTasks: ['Design an A/B test sample size calculation in Python', 'Simulate Monte Carlo estimations for portfolio risk'],
        recommendedProject: {
          title: 'E-Commerce Conversion Rate A/B Experimentation Engine',
          tech: 'Python, SciPy, Statsmodels, Streamlit',
          description: 'Statistical power analysis, Bayesian posterior probability modeling, and automated decision reporting.'
        },
        priority: 'High'
      }
    ]
  },

  'cloud_devops': {
    id: 'cloud_devops',
    title: 'Cloud & DevOps Engineer',
    category: 'Infrastructure',
    icon: 'cloud',
    description: 'Architects reliable, resilient cloud infrastructure, automates deployment pipelines, and manages container orchestration.',
    salaryRange: '$95k - $165k / ₹12 - 30 LPA',
    marketDemand: 'Extremely High (🔥 97%)',
    requiredSkills: [
      { name: 'Linux & Shell Scripting', benchmark: 85, weight: 1.1, category: 'OS', mustHave: true },
      { name: 'Docker & Containers', benchmark: 85, weight: 1.1, category: 'Containers', mustHave: true },
      { name: 'Kubernetes', benchmark: 75, weight: 1.2, category: 'Orchestration', mustHave: true },
      { name: 'AWS / Cloud Architecture', benchmark: 80, weight: 1.1, category: 'Cloud', mustHave: true },
      { name: 'CI/CD (GitHub Actions/GitLab)', benchmark: 80, weight: 1.0, category: 'Automation', mustHave: true },
      { name: 'Terraform (IaC)', benchmark: 70, weight: 0.9, category: 'Infrastructure', mustHave: false },
      { name: 'Python / Go Scripting', benchmark: 70, weight: 0.8, category: 'Core Programming', mustHave: false },
      { name: 'Networking & Security', benchmark: 75, weight: 0.8, category: 'CS Fundamentals', mustHave: false }
    ],
    codingTarget: {
      totalSolved: 100,
      easy: 60,
      medium: 35,
      hard: 5,
      contestRating: 1350
    },
    learningRoadmap: [
      {
        skill: 'Kubernetes',
        topics: ['Pods, Deployments, ReplicaSets', 'Services & Ingress Controllers', 'ConfigMaps & Secrets', 'Horizontal Pod Autoscalers (HPA)'],
        practiceTasks: ['Deploy a 3-tier microservice cluster on Minikube with Ingress', 'Configure HPA based on CPU load testing'],
        recommendedProject: {
          title: 'Zero-Downtime Blue/Green Kubernetes Deployment Fleet',
          tech: 'Kubernetes, ArgoCD, Helm, AWS EKS',
          description: 'GitOps pipeline featuring automated Canary rollouts, health probes, and rollback triggers.'
        },
        priority: 'High'
      }
    ]
  },

  'cybersecurity_analyst': {
    id: 'cybersecurity_analyst',
    title: 'Cybersecurity & Application Security Analyst',
    category: 'Security',
    icon: 'shield',
    description: 'Secures networks, systems, and applications against threats, performs penetration tests, and enforces security compliance.',
    salaryRange: '$90k - $155k / ₹11 - 26 LPA',
    marketDemand: 'Very High (🔥 94%)',
    requiredSkills: [
      { name: 'Networking & Protocols', benchmark: 85, weight: 1.1, category: 'CS Fundamentals', mustHave: true },
      { name: 'Linux System Security', benchmark: 80, weight: 1.0, category: 'OS', mustHave: true },
      { name: 'OWASP Top 10 & Web Sec', benchmark: 85, weight: 1.2, category: 'Security', mustHave: true },
      { name: 'Cryptography Fundamentals', benchmark: 75, weight: 0.9, category: 'Security', mustHave: true },
      { name: 'Python / Bash for Scripting', benchmark: 75, weight: 0.8, category: 'Core Programming', mustHave: false },
      { name: 'SIEM & Threat Analysis', benchmark: 70, weight: 0.8, category: 'Security Ops', mustHave: false },
      { name: 'Penetration Testing Tools', benchmark: 75, weight: 0.9, category: 'Security', mustHave: false }
    ],
    codingTarget: {
      totalSolved: 90,
      easy: 55,
      medium: 30,
      hard: 5,
      contestRating: 1300
    },
    learningRoadmap: [
      {
        skill: 'OWASP Top 10 & Web Sec',
        topics: ['SQL Injection & Prepared Statements', 'Cross-Site Scripting (XSS) Prevention', 'CSRF & CORS Protections', 'Broken Object Level Authorization'],
        practiceTasks: ['Solve PortSwigger Web Security Academy Labs on SQLi and SSRF', 'Perform automated security audit using OWASP ZAP'],
        recommendedProject: {
          title: 'Automated Vulnerability Scanner & Security Linter',
          tech: 'Python, BeautifulSoup, Requests, Docker',
          description: 'CLI tool scanning HTTP headers, SSL certificates, open ports, and form injection vulnerabilities.'
        },
        priority: 'High'
      }
    ]
  }
};

// Skill Taxonomy & Keywords for Resume Parsing
export const SKILLS_ONTOLOGY = {
  'Python': ['python', 'py', 'python3', 'django', 'flask', 'fastapi'],
  'Machine Learning': ['machine learning', 'ml', 'scikit-learn', 'sklearn', 'regression', 'random forest', 'xgboost', 'svm', 'clustering', 'supervised learning', 'unsupervised learning'],
  'Deep Learning': ['deep learning', 'dl', 'neural networks', 'cnn', 'rnn', 'lstm', 'transformers', 'bert', 'gpt', 'llm', 'computer vision', 'nlp', 'natural language processing'],
  'DSA & Algorithms': ['dsa', 'data structures', 'algorithms', 'leetcode', 'dynamic programming', 'graph algorithms', 'binary tree', 'sorting', 'arrays'],
  'PyTorch / TensorFlow': ['pytorch', 'tensorflow', 'keras', 'torch', 'tensor'],
  'Data Preprocessing & Pandas': ['pandas', 'numpy', 'scipy', 'data cleaning', 'eda', 'feature engineering'],
  'Model Deployment & MLOps': ['mlops', 'model deployment', 'mlflow', 'wandb', 'onnx', 'triton', 'huggingface', 'dvc'],
  'SQL & Database': ['sql', 'mysql', 'postgresql', 'postgres', 'sqlite', 'rdbms', 'queries'],
  'JavaScript / TypeScript': ['javascript', 'js', 'typescript', 'ts', 'ecmascript', 'es6'],
  'React / Next.js': ['react', 'react.js', 'reactjs', 'next.js', 'nextjs', 'redux', 'hooks'],
  'Node.js & Express': ['node', 'node.js', 'nodejs', 'express', 'express.js', 'rest api', 'backend'],
  'REST APIs & GraphQL': ['rest', 'restful', 'graphql', 'api integration', 'postman', 'swagger'],
  'System Design & Auth': ['system design', 'microservices', 'jwt', 'oauth', 'caching', 'redis', 'scalability', 'load balancing'],
  'HTML & Modern CSS': ['html', 'html5', 'css', 'css3', 'sass', 'tailwind', 'bootstrap', 'responsive design'],
  'Docker & DevOps Basics': ['docker', 'containerization', 'docker-compose', 'ci/cd', 'github actions'],
  'Linux & Shell Scripting': ['linux', 'bash', 'shell', 'ubuntu', 'unix', 'terminal'],
  'Kubernetes': ['kubernetes', 'k8s', 'helm', 'minikube', 'cluster'],
  'AWS / Cloud Architecture': ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloud', 'gcp', 'azure'],
  'Terraform (IaC)': ['terraform', 'iac', 'infrastructure as code', 'ansible'],
  'Statistics & Probability': ['statistics', 'probability', 'hypothesis testing', 'a/b testing', 'bayes'],
  'Data Visualization & BI': ['tableau', 'power bi', 'matplotlib', 'seaborn', 'plotly', 'data visualization'],
  'OWASP Top 10 & Web Sec': ['owasp', 'web security', 'xss', 'sqli', 'csrf', 'penetration testing', 'burp suite'],
  'Git & Version Control': ['git', 'github', 'gitlab', 'version control', 'git flow']
};
