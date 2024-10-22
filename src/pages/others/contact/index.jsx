import Contact from "@/components/pages-menu/contact";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Contact || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const ContactPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Contact />
    </>
  );
};

export default ContactPage;
