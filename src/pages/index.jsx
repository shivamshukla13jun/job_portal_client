import Wrapper from "@/layout/Wrapper";
import HomeComponent from "@/components/home-1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-1 || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

export default function Home() {
  return (
    <Wrapper>
      <MetaComponent meta={metadata} />
      <HomeComponent />
    </Wrapper>
  );
}
