import Cart from "@/components/shop/cart";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Cart || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const CartPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Cart />
    </>
  );
};

export default CartPage;
