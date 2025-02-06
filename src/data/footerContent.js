import { paths } from "@/services/paths";

const footerContent = [
  {
    id: 1,
    title: "For Candidates",
    menuList: [
      { name: "Browse Jobs", route:paths.job_list},
      { name: "Browse Categories", route: paths.job_list},
      { name: "Candidate Dashboard", route:paths.candidate },
      // { name: "Job Alerts", route: "/candidates-dashboard/job-alerts" },
      {
        name: "My Bookmarks",
        route: paths.candidate_saved_jobs,
      },
    ],
  },
  {
    id: 2,
    title: "For Employers",
    menuList: [
      {
        name: "Browse Candidates",
        route: paths.candidatelist,
        // route: window.location.pathname,
      },
      { name: "Employer Dashboard", route:paths.employer},
      { name: "Add Job", route: paths.employer_post_jobs},
      // { name: "Job Packages", route: "/employers-dashboard/packages" },
    ],
  },
  {
    id: 3,
    title: "About Us",
    menuList: [
      { name: "About Us", route: paths.about },
      // { name: "Job Page Invoice", route: "/invoice" },
      { name: "Terms and Conditions", route: paths.terms },
      { name: "Blog", route:paths.blog },
      { name: "Contact", route: paths.contact },
    ],
  },
  {
    id: 4,
    title: "Helpful Resources",
    menuList: [
      { name: "Site Map", route: window.location.pathname},
      { name: "Terms & Conditions", route:paths.terms },
      { name: "Privacy Policy", route: paths.privacy },
      { name: "Faq", route:paths.faq },
      // { name: "Security Center", route: "/" },
      // { name: "Accessibility Center", route: "/" },
    ],
  },
];
export default footerContent