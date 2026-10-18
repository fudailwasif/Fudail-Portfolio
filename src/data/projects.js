export const projectsData = [
  {
    id: 'high-grade',
    number: '01',
    category: 'Business website',
    title: 'High Grade Inspection',
    description:
      'A responsive business website that organizes inspection categories, quality assurance services, company information, and direct contact options.',
    tags: ['Service navigation', 'Responsive interface'],
    engineering: 'Organizing detailed service information into an approachable, responsive experience.',
    details:
      'The live site presents inspection categories, quality assurance services, company information, and contact options. The focus here is on helping visitors move from understanding a service to making an enquiry.',
    live: 'https://highgradeinspection.vercel.app/',
    liveLabel: 'Live website',
    video: '/videos/high-grade-inspection.mp4',
    image: {
      path: 'high-grade',
      width: 1330,
      height: 900,
      alt: 'High Grade Inspection website showing its industrial inspection introduction and service navigation.',
    },
  },
  {
    id: 'gitscout',
    number: '02',
    category: 'GitHub REST API application',
    title: 'GitScout',
    description:
      'GitScout searches public GitHub profiles and repositories through the GitHub REST API, presenting results in a focused React interface.',
    tags: ['React', 'Tailwind CSS', 'Axios', 'GitHub REST API'],
    engineering: 'Parallel requests, cancellation, and considered loading, error, and empty states.',
    details:
      'Profile and repository requests run in parallel. Request cancellation prevents outdated searches from replacing newer results. Loading feedback, HTTP error messages, and fallbacks for missing profile or repository information keep the interface useful when the API has less to offer.',
    live: 'https://gitscout-nu.vercel.app/',
    liveLabel: 'Live demo',
    source: 'https://github.com/fudailwasif/GitScout',
    video: '/videos/gitscout.mp4',
    image: {
      path: 'gitscout',
      width: 1330,
      height: 900,
      alt: 'GitScout live application with a GitHub username search and Fudail Wasif’s profile results.',
    },
  },
  {
    id: 'rick-owens',
    number: '03',
    category: 'Unofficial frontend recreation',
    title: 'Rick Owens',
    subtitle: 'Frontend Recreation',
    description:
      'An unofficial React and Tailwind CSS recreation of a fashion storefront, with routed collections and locally persisted cart and wishlist state.',
    tags: ['React', 'Tailwind CSS', 'React Router', 'localStorage'],
    engineering: 'Shared cart and wishlist state, carried across routes and saved in the browser.',
    details:
      'Reusable components connect collections, a shopping bag, and a wishlist. Shared state handles quantities and totals; localStorage preserves selections in the same browser. This is an unofficial educational recreation, unaffiliated with Rick Owens. Account and checkout screens are frontend demonstrations without payment or account services.',
    live: 'https://rick-owens-frontend-recreation.vercel.app/home',
    liveLabel: 'Live demo',
    source: 'https://github.com/fudailwasif/RickOwens-Frontend-Recreation',
    video: '/videos/rick-owens.mp4',
    image: {
      path: 'rick-owens',
      width: 1330,
      height: 900,
      alt: 'Rick Owens unofficial frontend recreation showing its monochrome fashion campaign and collection navigation.',
    },
  },
];
