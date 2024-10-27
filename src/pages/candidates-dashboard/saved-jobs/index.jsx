import SavedJobs from "@/components/dashboard-pages/candidates-dashboard/saved-jobs";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Saved Jobs || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const SavedJobsPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <SavedJobs />
    </>
  );
};

export default SavedJobsPage;
