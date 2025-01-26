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

      <Breadcrumb title="Faq's" meta="Faq's" />
      {/* <!--End Page Title--> */}

      <section className="faqs-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Frequently Asked Questions</h2>
            <div className="text">Home / Faq</div>
          </div>

          {/* <h3>Payments</h3> */}
          {/* <!--Accordian Box--> */}
          <ul className="accordion-box">
            <FaqChild />
          </ul>

          {/* <h3>Suggestions</h3> */}
          {/* <!--Accordian Box--> */}
          {/* <ul className="accordion-box mb-0">
            <FaqChild />
          </ul> */}
        </div>
      </section>
      {/* <!-- End Faqs Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
