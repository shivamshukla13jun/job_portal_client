import ShortListedJobs from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Short ListedJobs || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const ShortListedJobsPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ShortListedJobs />
    </>
  );
};

export default ShortListedJobsPage;
