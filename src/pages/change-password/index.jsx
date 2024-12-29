
import MetaComponent from "@/components/common/MetaComponent";
import ChangePassword from "./ChangePassword";

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
