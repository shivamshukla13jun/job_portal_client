import ShortlistedResumes from "@/components/dashboard-pages/employers-dashboard/shortlisted-resumes";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shortlisted Candidates || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const ShortListedResumeEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ShortlistedResumes />
    </>
  );
};

export default ShortListedResumeEmploeeDBPage;
