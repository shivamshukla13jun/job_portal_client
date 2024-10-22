import LogIn from "@/components/pages-menu/forgot";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const ForgotPasswordPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <LogIn />
    </>
  );
};

export default ForgotPasswordPage;
