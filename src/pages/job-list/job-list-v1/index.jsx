import JobList from "@/components/job-listing-pages/job-list-v1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V1 || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const JobListPage1 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage1;
