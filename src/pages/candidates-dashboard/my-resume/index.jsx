import MyResume from "@/components/dashboard-pages/candidates-dashboard/my-resume";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Resume || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const MyResumePage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <MyResume />
    </>
  );
};

export default MyResumePage;
