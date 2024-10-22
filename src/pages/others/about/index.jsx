import About from "@/components/pages-menu/about";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "About || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const AboutPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <About />
    </>
  );
};

export default AboutPage;
