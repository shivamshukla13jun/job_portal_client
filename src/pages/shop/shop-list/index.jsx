import ShopList from "@/components/shop/shop-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shop List || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const ShopListPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ShopList />
    </>
  );
};

export default ShopListPage;
