import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const CompanyProfileEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <CompanyProfile />
    </>
  );
};

export default CompanyProfileEmploeeDBPage;
