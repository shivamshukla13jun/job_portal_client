import ManageJobs from "@/components/dashboard-pages/admin-dashboard/manage-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Manage Jobs || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const ManageJobsEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ManageJobs />
    </>
  );
};

export default ManageJobsEmploeeDBPage;
