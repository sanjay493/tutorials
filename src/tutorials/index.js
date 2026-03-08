import DevOpsTutorial from './DevOps';
// import FrontendTutorial from './Frontend';
// import BackendTutorial from './Backend';

const TutorialRegistry = [
    {
        id: 'devops',
        title: 'DevOps Mastery',
        path: 'devops',
        description: 'Learn CI/CD, Docker, and Cloud Deployment.',
        component: DevOpsTutorial,
        icon: '🚀'
    },
    // {
    //   id: 'frontend',
    //   title: 'Frontend Excellence',
    //   path: 'frontend',
    //   description: 'Master React, CSS, and modern web design.',
    //   component: FrontendTutorial,
    //   icon: '🎨'
    // },
];

export default TutorialRegistry;
