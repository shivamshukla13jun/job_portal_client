import ShortlistedResumes from "@/components/dashboard-pages/subemployers-dashboard/shortlisted-resumes";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shortlisted Resumes || Chem Pharma - Job Borad ReactJs Template",
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
