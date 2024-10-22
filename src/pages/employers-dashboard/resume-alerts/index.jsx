import ResumeAlerts from "@/components/dashboard-pages/employers-dashboard/resume-alerts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Resume Alerts || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const ResumeAlertsEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ResumeAlerts />
    </>
  );
};

export default ResumeAlertsEmploeeDBPage;
