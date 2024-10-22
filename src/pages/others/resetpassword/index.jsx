import LogIn from "@/components/pages-menu/resetpassword";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const ResetPassword = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <LogIn />
    </>
  );
};

export default ResetPassword;
