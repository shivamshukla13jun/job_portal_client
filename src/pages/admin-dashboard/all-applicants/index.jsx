import AllApplicants from "@/components/dashboard-pages/admin-dashboard/all-applicants";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "All Applicants || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const AllApplicantsEmploeesPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <AllApplicants />
    </>
  );
};

export default AllApplicantsEmploeesPage;
