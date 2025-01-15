import DashboardHeader from "@/components/header/DashboardHeader";
import FooterDefault from "../../footer/common-footer";
import TermsText from "./TermsText";

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
            <h2>Terms and Conditions</h2>
            <div className="text">Home / Terms and Conditions</div>
          </div>
          {/* End sec-title */}
          <TermsText />
        </div>
      </section>
      {/* <!-- End TNC Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
