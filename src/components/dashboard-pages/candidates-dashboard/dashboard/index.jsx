import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import ProfileChart from "./components/ProfileChart";
import Notification from "./components/Notification";
import CopyrightFooter from "../../CopyrightFooter";
import JobApplied from "./components/JobApplied";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useState } from "react";
import { get } from "@/services/api";
import useDebounce from "@/utils/hooks/useDebounce";

const Index = () => {
  const userInfo = useUserInfo();
  const [statrtdate, setStartdate] = useState("")


  const { data, isLoading } = useQuery({
    queryKey: [`dashboard/candidate`, statrtdate],
    queryFn: async () => {
    try {
      let res = (await get(`dashboard/candidate`)).data.data
      return res;
    } catch (error) {
      //console.log(error)
    }
    },
  
    enabled: !!userInfo._id
  });
  console.log("userInfo",userInfo)
  const [search, setSearch] = useState({
    page: 1,
    limit: 10,
    clear:false,
    keyword: userInfo?.userTypeValue?.designation || "",
    location: '',
    categories: '',
    job_type: '',
    date_posted: '',
    experience_from: 0,
    experience_to: 10,
    salary_from: 0,
    salary_to: 10000,
    tags: [],
    sort: 'new'
});


const { data:Matchjobs, isLoading:MatchjobLoading } = useQuery({
    queryKey: ['jobs', userInfo],
    queryFn: async () => {
        try {
          // Extract unique category values
const uniqueCategories = [
  ...new Set(
    userInfo?.userTypeValue?.employment
      ?.flatMap((job) => job.categories.map((category) => category.value))
  ),
];

// Join unique categories as a comma-separated string
const categoriesString = uniqueCategories.join(", ");

// &keyword=${userInfo?.userTypeValue?.designation}
console.log(categoriesString);
            let res = await get(`job?page=${search.page}&categories=${categoriesString}
              &location=${userInfo?.userTypeValue?.contact?.current_address?.city}`);
           return {
                data: res.data.data,
                count: res.data.count
            }
        } catch (error) {
          console.log(error)
            toast.error(error.response.data.error);
            return { data: [], count: 0 };
        }
    },
    enabled:!!userInfo?.userTypeValue && Object.keys(userInfo?.userTypeValue).length>0
});
console.log({Matchjobs})
  if (isLoading) return <div>Loading...</div>
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title={data?.user?.name} />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <TopCardBlock data={data} />
          </div>
          {/* End .row top card block */}

          <div className="row">
            <div className="col-xl-7 col-lg-12">
              {/* <!-- Graph widget --> */}
              <div className="graph-widget ls-widget">
                {/* <ProfileChart /> */}
              </div>
              {/* End profile chart */}
            </div>
            {/* End .col */}

              {/* <!-- Notification Widget --> */}
            {/* <div className="col-xl-5 col-lg-12">
              <div className="notification-widget ls-widget">
                <div className="widget-title">
                  <h4>Notifications</h4>
                </div>
                <div className="widget-content">
                  <Notification />
                </div>
              </div>
            </div> */}
            {/* End .col */}
           {!MatchjobLoading &&   <div className="col-lg-12">
              <div className="applicants-widget ls-widget">
                <div className="widget-title">
                  <h4>Matching Jobs</h4>
                </div>
                <div className="widget-content">
                  <div className="row">
                    <JobApplied data={Matchjobs?.data || []}/>
                  </div>
                </div>
              </div>
            </div> }
          
            {/* End .col */}
          </div>
          {/* End .row profile and notificatins */}
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

export default Index;
