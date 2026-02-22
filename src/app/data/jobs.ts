export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  applyLink: string;
  category: 'IT' | 'Non-IT' | 'Remote' | 'Freshers';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experienceLevel: 'Fresher' | '0-1 years' | '1-3 years' | '3-5 years' | '5+ years';
  postedDate: string;
  companyDescription: string;
  isFresherFriendly: boolean;
  slug: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    slug: 'react-developer-bangalore',
    title: 'React Developer',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    description: 'We are looking for a talented React Developer to join our dynamic team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack.',
    requirements: [
      'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model',
      'Thorough understanding of React.js and its core principles',
      'Experience with popular React.js workflows (such as Flux or Redux)',
      'Familiarity with RESTful APIs',
      'Knowledge of modern authorization mechanisms, such as JSON Web Token',
      'Experience with common front-end development tools such as Babel, Webpack, NPM, etc.',
      'Ability to understand business requirements and translate them into technical requirements'
    ],
    salary: '₹4-8 LPA',
    applyLink: 'https://example.com/apply/react-developer',
    category: 'IT',
    jobType: 'Full-time',
    experienceLevel: '0-1 years',
    postedDate: '2026-02-22',
    companyDescription: 'TechCorp Solutions is a leading software development company focused on delivering innovative solutions to clients worldwide. We foster a culture of learning and growth.',
    isFresherFriendly: true
  },
  {
    id: '2',
    slug: 'frontend-developer-hyderabad',
    title: 'Frontend Developer - Fresher',
    company: 'Digital Innovations',
    location: 'Hyderabad, India',
    description: 'Join our team as a Frontend Developer and work on cutting-edge web applications. This is a great opportunity for freshers who are passionate about web development.',
    requirements: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Understanding of responsive design principles',
      'Familiarity with version control systems like Git',
      'Good problem-solving skills',
      'Excellent communication skills',
      'Bachelor\'s degree in Computer Science or related field'
    ],
    salary: '₹3-5 LPA',
    applyLink: 'https://example.com/apply/frontend-developer',
    category: 'Freshers',
    jobType: 'Full-time',
    experienceLevel: 'Fresher',
    postedDate: '2026-02-21',
    companyDescription: 'Digital Innovations is a fast-growing startup specializing in digital transformation solutions. We believe in nurturing fresh talent and providing opportunities for career growth.',
    isFresherFriendly: true
  },
  {
    id: '3',
    slug: 'full-stack-developer-remote',
    title: 'Full Stack Developer (Remote)',
    company: 'CloudTech Inc',
    location: 'Remote',
    description: 'We are seeking a Full Stack Developer to work remotely and contribute to our cloud-based applications. You will work with both frontend and backend technologies.',
    requirements: [
      'Experience with Node.js and Express.js',
      'Proficiency in React.js or Vue.js',
      'Experience with MongoDB or PostgreSQL',
      'Understanding of RESTful API design',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Strong problem-solving and debugging skills',
      'Excellent communication skills for remote work'
    ],
    salary: '₹6-12 LPA',
    applyLink: 'https://example.com/apply/fullstack-developer',
    category: 'Remote',
    jobType: 'Remote',
    experienceLevel: '1-3 years',
    postedDate: '2026-02-20',
    companyDescription: 'CloudTech Inc is a cloud solutions provider helping businesses transform their infrastructure. We embrace remote work culture and value flexibility.',
    isFresherFriendly: false
  },
  {
    id: '4',
    slug: 'software-engineer-trainee-pune',
    title: 'Software Engineer Trainee',
    company: 'InfoSystems Global',
    location: 'Pune, India',
    description: 'Excellent opportunity for fresh graduates to start their career in software development. You will receive comprehensive training and mentorship.',
    requirements: [
      'Bachelor\'s degree in Computer Science, IT, or related field',
      'Basic understanding of programming concepts',
      'Knowledge of any programming language (Java, Python, C++)',
      'Good analytical and problem-solving skills',
      'Willingness to learn new technologies',
      'Strong communication skills'
    ],
    salary: '₹2.5-4 LPA',
    applyLink: 'https://example.com/apply/software-trainee',
    category: 'Freshers',
    jobType: 'Full-time',
    experienceLevel: 'Fresher',
    postedDate: '2026-02-22',
    companyDescription: 'InfoSystems Global is a multinational IT services company with a strong focus on employee development and training programs.',
    isFresherFriendly: true
  },
  {
    id: '5',
    slug: 'python-developer-delhi',
    title: 'Python Developer',
    company: 'DataMinds Analytics',
    location: 'Delhi NCR, India',
    description: 'Looking for a Python Developer to work on data analytics and machine learning projects. You will be part of a team building innovative data solutions.',
    requirements: [
      'Strong proficiency in Python programming',
      'Experience with Django or Flask framework',
      'Knowledge of data structures and algorithms',
      'Familiarity with SQL and NoSQL databases',
      'Understanding of RESTful APIs',
      'Experience with version control (Git)',
      'Good communication and teamwork skills'
    ],
    salary: '₹5-9 LPA',
    applyLink: 'https://example.com/apply/python-developer',
    category: 'IT',
    jobType: 'Full-time',
    experienceLevel: '1-3 years',
    postedDate: '2026-02-19',
    companyDescription: 'DataMinds Analytics specializes in providing data-driven solutions to businesses across various industries. We leverage cutting-edge technologies to solve complex problems.',
    isFresherFriendly: false
  },
  {
    id: '6',
    slug: 'business-analyst-mumbai',
    title: 'Business Analyst',
    company: 'ConsultPro Services',
    location: 'Mumbai, India',
    description: 'We are hiring a Business Analyst to bridge the gap between business needs and technical solutions. Fresh MBAs are encouraged to apply.',
    requirements: [
      'MBA or equivalent degree',
      'Strong analytical and problem-solving skills',
      'Excellent communication and presentation skills',
      'Basic understanding of business processes',
      'Proficiency in MS Office (Excel, PowerPoint, Word)',
      'Ability to work with cross-functional teams',
      'Keen attention to detail'
    ],
    salary: '₹4-7 LPA',
    applyLink: 'https://example.com/apply/business-analyst',
    category: 'Non-IT',
    jobType: 'Full-time',
    experienceLevel: '0-1 years',
    postedDate: '2026-02-21',
    companyDescription: 'ConsultPro Services is a management consulting firm helping organizations optimize their operations and achieve strategic goals.',
    isFresherFriendly: true
  },
  {
    id: '7',
    slug: 'ui-ux-designer-bangalore',
    title: 'UI/UX Designer',
    company: 'CreativeMinds Studio',
    location: 'Bangalore, India',
    description: 'Join our creative team as a UI/UX Designer. You will be responsible for creating intuitive and visually appealing user interfaces for web and mobile applications.',
    requirements: [
      'Proficiency in design tools like Figma, Adobe XD, or Sketch',
      'Understanding of user-centered design principles',
      'Knowledge of HTML/CSS is a plus',
      'Strong portfolio showcasing design projects',
      'Excellent visual design skills',
      'Good communication and collaboration skills',
      'Ability to work in a fast-paced environment'
    ],
    salary: '₹3-6 LPA',
    applyLink: 'https://example.com/apply/ui-ux-designer',
    category: 'IT',
    jobType: 'Full-time',
    experienceLevel: '0-1 years',
    postedDate: '2026-02-22',
    companyDescription: 'CreativeMinds Studio is a design agency specializing in digital product design. We create beautiful and functional experiences for our clients.',
    isFresherFriendly: true
  },
  {
    id: '8',
    slug: 'content-writer-remote',
    title: 'Content Writer (Remote)',
    company: 'WordCraft Media',
    location: 'Remote',
    description: 'We are looking for a creative Content Writer to produce engaging content for our blogs, websites, and social media channels. Work from anywhere!',
    requirements: [
      'Excellent writing and editing skills in English',
      'Ability to research and write on various topics',
      'Basic SEO knowledge',
      'Familiarity with content management systems',
      'Strong attention to detail',
      'Ability to meet deadlines',
      'Portfolio of published articles is a plus'
    ],
    salary: '₹2.5-5 LPA',
    applyLink: 'https://example.com/apply/content-writer',
    category: 'Remote',
    jobType: 'Remote',
    experienceLevel: 'Fresher',
    postedDate: '2026-02-20',
    companyDescription: 'WordCraft Media is a content marketing agency helping brands tell their stories through compelling content.',
    isFresherFriendly: true
  },
  {
    id: '9',
    slug: 'java-developer-chennai',
    title: 'Java Developer',
    company: 'Enterprise Solutions Ltd',
    location: 'Chennai, India',
    description: 'We are seeking a Java Developer to work on enterprise-level applications. You will be part of a team developing scalable and robust solutions.',
    requirements: [
      'Strong knowledge of Core Java and J2EE',
      'Experience with Spring Framework and Hibernate',
      'Understanding of object-oriented programming',
      'Familiarity with SQL databases',
      'Knowledge of web services (REST/SOAP)',
      'Experience with Maven or Gradle',
      'Good debugging and problem-solving skills'
    ],
    salary: '₹4-8 LPA',
    applyLink: 'https://example.com/apply/java-developer',
    category: 'IT',
    jobType: 'Full-time',
    experienceLevel: '1-3 years',
    postedDate: '2026-02-18',
    companyDescription: 'Enterprise Solutions Ltd is a software development company specializing in enterprise applications for large organizations.',
    isFresherFriendly: false
  },
  {
    id: '10',
    slug: 'hr-trainee-noida',
    title: 'HR Trainee',
    company: 'PeopleFirst HR Solutions',
    location: 'Noida, India',
    description: 'Great opportunity for freshers interested in Human Resources. You will assist in recruitment, employee engagement, and HR operations.',
    requirements: [
      'MBA in HR or related field',
      'Good interpersonal and communication skills',
      'Basic knowledge of HR processes',
      'Proficiency in MS Office',
      'Ability to maintain confidentiality',
      'Positive attitude and willingness to learn',
      'Strong organizational skills'
    ],
    salary: '₹2-4 LPA',
    applyLink: 'https://example.com/apply/hr-trainee',
    category: 'Non-IT',
    jobType: 'Full-time',
    experienceLevel: 'Fresher',
    postedDate: '2026-02-21',
    companyDescription: 'PeopleFirst HR Solutions is an HR consulting firm providing end-to-end HR services to organizations.',
    isFresherFriendly: true
  },
  {
    id: '11',
    slug: 'digital-marketing-executive-gurgaon',
    title: 'Digital Marketing Executive',
    company: 'MarketGrow Agency',
    location: 'Gurgaon, India',
    description: 'We are hiring a Digital Marketing Executive to manage online marketing campaigns and improve brand presence across digital channels.',
    requirements: [
      'Basic understanding of digital marketing concepts',
      'Knowledge of SEO, SEM, and social media marketing',
      'Familiarity with Google Analytics and Google Ads',
      'Good content creation skills',
      'Excellent communication skills',
      'Creativity and analytical mindset',
      'Degree in Marketing or related field'
    ],
    salary: '₹3-6 LPA',
    applyLink: 'https://example.com/apply/digital-marketing',
    category: 'Non-IT',
    jobType: 'Full-time',
    experienceLevel: '0-1 years',
    postedDate: '2026-02-22',
    companyDescription: 'MarketGrow Agency is a digital marketing agency helping businesses grow their online presence and reach their target audience.',
    isFresherFriendly: true
  },
  {
    id: '12',
    slug: 'devops-engineer-bangalore',
    title: 'DevOps Engineer',
    company: 'CloudScale Technologies',
    location: 'Bangalore, India',
    description: 'Looking for a DevOps Engineer to manage our cloud infrastructure and implement CI/CD pipelines. Experience with AWS and Docker is required.',
    requirements: [
      'Experience with AWS, Azure, or GCP',
      'Strong knowledge of Docker and Kubernetes',
      'Experience with CI/CD tools (Jenkins, GitLab CI)',
      'Proficiency in scripting languages (Python, Bash)',
      'Understanding of infrastructure as code (Terraform, CloudFormation)',
      'Knowledge of monitoring tools (Prometheus, Grafana)',
      'Strong problem-solving skills'
    ],
    salary: '₹8-15 LPA',
    applyLink: 'https://example.com/apply/devops-engineer',
    category: 'IT',
    jobType: 'Full-time',
    experienceLevel: '3-5 years',
    postedDate: '2026-02-19',
    companyDescription: 'CloudScale Technologies helps businesses scale their infrastructure efficiently using modern DevOps practices and cloud technologies.',
    isFresherFriendly: false
  }
];
