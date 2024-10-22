import React from "react";
import Home from "@/components/home-1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home || Chem Pharma",
  description: "Chem Pharma",
};

const HomePage1 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage1;
