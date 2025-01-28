import DashboardHeader from "@/components/header/DashboardHeader";
import Breadcrumb from "../../common/Breadcrumb";
import FooterDefault from "../../footer/common-footer";
import FaqChild from "./FaqChild";

const index = () => {
  return (
    <>
    {/* <!-- Header Span --> */}
    <span className="header-span"></span>

    <DashboardHeader />
    {/* End MobileMenu */}

    <section className="tnc-section">
      <div className="auto-container">
        <div className="sec-title text-center">
        <h2>Frequently Asked Questions</h2>
        <div className="text">Home / Faq</div>
        </div>
        {/* End sec-title */}
        <FaqChild />
      </div>
    </section>
    {/* <!-- End TNC Section --> */}

    <FooterDefault footerStyle="alternate5" />
    {/* <!-- End Main Footer --> */}
  </>
  );
};

export default index;
