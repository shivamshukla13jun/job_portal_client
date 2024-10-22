import Invoice from "@/components/pages-menu/invoice";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Invoice || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const InvoicePage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Invoice />
    </>
  );
};

export default InvoicePage;
