import RegisterForm from "@/components/pages-menu/register";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Register || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const RegisterPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <RegisterForm />
    </>
  );
};

export default RegisterPage;
