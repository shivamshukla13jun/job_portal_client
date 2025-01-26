import DashboardHeader from "@/components/header/DashboardHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterDefault from "@/components/footer/common-footer";
import PrivacyPolicyAndTerms from "./PrivacyPolicyAndTerms";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <DashboardHeader />
      {/* End MobileMenu */}

      <Breadcrumb title="Privacy Policy" meta="Privacy Policy" />
      {/* <!--End Page Title--> */}

      <section className="faqs-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2></h2>
            <div className="text">Home / Privacy Policy</div>
          </div>
            <PrivacyPolicyAndTerms/>
        </div>
      </section>
      {/* <!-- End Faqs Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
