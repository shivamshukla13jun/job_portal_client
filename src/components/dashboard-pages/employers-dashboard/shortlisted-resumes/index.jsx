import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";

import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import WidgetToFilterBox from "./components/WidgetToFilterBox";
import WidgetContentBox from "./components/WidgetContentBox";
import MenuToggler from "../../MenuToggler";
import { useQuery } from "@tanstack/react-query";
import { get, getById } from "@/services/api";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import DashboardSubEmployerSidebar from "@/components/header/DashboardSubEmployerSidebar";
import DashboardEmployerSidebar from "@/components/header/DashboardEmployerSidebar";

const index = () => {
  const userInfo = useUserInfo();
  const [search, setSearch] = useState({
    page: 1,
    limit: 10,
    createdAt: '',
    search:""
});
const handleSerch=(name,value)=>{
  setSearch((prev)=>({
    ...prev,
    [name]:value
  }))
}
  const debouncedSearch = useDebounce(search.search, 500);

  const { data, isLoading } = useQuery({
    queryKey: [`application/tracking`, debouncedSearch,search.createdAt],
    queryFn: async () => {
      let res = (await get(`application/tracking?createdAt=${search.createdAt}&page=${search.page}&limit=${search.limit}&name=${debouncedSearch}&status=shortlisted`)).data;
      return res;
    },
    enabled: !!userInfo._id
  });

  if (isLoading) return <div>Loading...</div>

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
          <BreadCrumb title="Shortlisted Resumes!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="applicants-widget ls-widget">
                <div className="widget-title">
                  <h4>Shorlist Resumes</h4>
                  <WidgetToFilterBox search={search} handleSerch={handleSerch} />
                </div>
                {/* End widget top filter box */}
                <WidgetContentBox data={data} search={search}/>
              </div>
              {/* <!-- applicants Widget --> */}
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
    // End page-wrapper
  );
};

export default index;
