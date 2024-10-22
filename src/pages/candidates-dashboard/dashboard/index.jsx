import DashboadHome from "@/components/dashboard-pages/candidates-dashboard/dashboard";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Candidates Dashboard || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const DashboardPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboadHome />
    </>
  );
};

export default DashboardPage;
