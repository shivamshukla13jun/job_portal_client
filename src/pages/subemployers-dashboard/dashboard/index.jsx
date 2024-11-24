import DashboadHome from "@/components/dashboard-pages/subemployers-dashboard/dashboard";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Sub Employeers Dashboard || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const DashboardSubemplyerDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboadHome />
    </>
  );
};

export default DashboardSubemplyerDBPage;
