const footerContent = [
  {
    id: 1,
    title: "For Candidates",
    menuList: [
      { name: "Browse Jobs", route: "/job-list-v1" },
      { name: "Browse Categories", route: "/job-list-v3" },
      { name: "Candidate Dashboard", route: "/candidates-dashboard/dashboard" },
      // { name: "Job Alerts", route: "/candidates-dashboard/job-alerts" },
      // {
      //   name: "My Bookmarks",
      //   route: "/candidates-dashboard/short-listed-jobs",
      // },
    ],
  },
  {
    id: 2,
    title: "For Employers",
    menuList: [
      {
        name: "Browse Candidates",
        // route: "/candidates-list-v1",
        route: window.location.pathname,
      },
      { name: "Employer Dashboard", route: "/employers-dashboard/dashboard" },
      { name: "Add Job", route: "/employers-dashboard/post-jobs" },
      // { name: "Job Packages", route: "/employers-dashboard/packages" },
    ],
  },
  {
    id: 3,
    title: "Quick Links",
    menuList: [
      { name: "About Us", route: "/about" },
      // { name: "Job Page Invoice", route: "/invoice" },
      // { name: "Terms and Conditions", route: "/terms" },
      { name: "Blog", route: "/blog-list-v1" },
      { name: "Contact", route: "/contact" },
    ],
  },
  {
    id: 4,
    title: "Helpful Resources",
    menuList: [
      { name: "Site Map", route: window.location.pathname},
      { name: "Terms and Conditions", route: "/terms" },
      { name: "Privacy Policy", route: "/privacy" },
      { name: "Faq", route: "/faq" },
      // { name: "Security Center", route: "/" },
      // { name: "Accessibility Center", route: "/" },
    ],
  },
];
export default footerContent