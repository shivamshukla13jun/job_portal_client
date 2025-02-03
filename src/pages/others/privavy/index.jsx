import Privacy from "@/components/pages-menu/Privacy";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Privacy || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const PrivacyPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Privacy />
    </>
  );
};

export default PrivacyPage;
