import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import JobListingsTable from "./components/JobListingsTable";
import MenuToggler from "../../MenuToggler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get } from "@/services/api";
import { toast } from "react-toastify";
import useUserInfo from "@/utils/hooks/useUserInfo";
import Pagination from "@/utils/hooks/usePagination";
import { useState } from "react";

const index = () => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();
  const [page,setPage]=useState(1)
  const [limit,setLimit]=useState(2)
  const { data, isLoading } = useQuery({
    queryKey: [`jobs${userInfo._id}`,page],
    queryFn: async () => {
      const res = await get(`/job/employer?page=${page}&limit=${limit}`);
      return res.data;
    },
    enabled: !!userInfo._id
  });

  const mutation = useMutation({
    mutationFn: (data) => del('job', data._id),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        queryClient.invalidateQueries(["jobs", userInfo._id]);
      }
    },
    onError: (err) => {
      toast.error(err.response.data.error)
    }
  })

  const handleJobDelete = (data) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      mutation.mutate({ _id: data });
    }
  }

  if (isLoading) return <div>Loading....</div>

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
          <BreadCrumb title="Manage jobs!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <JobListingsTable data={data?.data || []} handleJobDelete={handleJobDelete} />
                {data?.totalpages &&  <Pagination Page={page} limit={limit} totalPages={data?.totalpages || 0} handlePageChange={(page)=>setPage(page)} /> }
                
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
    // End page-wrapper
  );
};

export default index;
