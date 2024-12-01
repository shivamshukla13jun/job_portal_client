
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";

import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import DashboardAdminSidebar from "@/components/header/DashboardAdminSidebar";
import SubEmployerList from "@/pages/admin-dashboard/subemployers/SubEmployerList";
import Breadcrumb from "@/components/common/Breadcrumb";

const index = () => {


    return (
        <div className="page-wrapper dashboard">
        <span className="header-span"></span>
        {/* <!-- Header Span for hight --> */}
    
        <LoginPopup />
        {/* End Login Popup Modal */}
    
        <DashboardHeader />
        {/* End Header */}
    
        <MobileMenu />
        {/* End MobileMenu */}
    
        <DashboardAdminSidebar />
        {/* <!-- End User Sidebar Menu --> */}
    
        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <Breadcrumb title="Employers !" />
            {/* breadCrumb */}
    
            <MenuToggler />
            {/* Collapsible sidebar button */}
    
            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  <SubEmployerList/>
                </div>
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}
    
        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
    );
};

export default index;
