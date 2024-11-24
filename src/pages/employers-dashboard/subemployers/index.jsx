import React from 'react'
import LoginPopup from '@/components/common/form/login/LoginPopup';
import DashboardHeader from '@/components/header/DashboardHeader';
import DashboardEmployerSidebar from '@/components/header/DashboardEmployerSidebar';
import MobileMenu from '@/components/header/MobileMenu';
import Breadcrumb from '@/components/common/Breadcrumb';
import MenuToggler from '@/components/dashboard-pages/MenuToggler';
import CopyrightFooter from '@/components/dashboard-pages/CopyrightFooter';
import SubEmployerList from './SubEmployerList';
const SubEmployer = () => {
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

    <DashboardEmployerSidebar />
    {/* <!-- End User Sidebar Menu --> */}

    {/* <!-- Dashboard --> */}
    <section className="user-dashboard">
      <div className="dashboard-outer">
        <Breadcrumb title="Manage jobs!" />
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
  )
}

export default SubEmployer