import Terms from "@/components/pages-menu/terms";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Terms || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const TermsPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Terms />
    </>
  );
};

export default TermsPage;
