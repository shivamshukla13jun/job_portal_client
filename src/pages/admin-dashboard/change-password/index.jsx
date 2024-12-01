import ChangePassword from "@/components/dashboard-pages/admin-dashboard/change-password";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Change Password || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const ChangePasswordEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ChangePassword />
    </>
  );
};

export default ChangePasswordEmploeeDBPage;
