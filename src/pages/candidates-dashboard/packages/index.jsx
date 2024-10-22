import Packages from "@/components/dashboard-pages/candidates-dashboard/packages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Packages || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const PackagePage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Packages />
    </>
  );
};

export default PackagePage;
