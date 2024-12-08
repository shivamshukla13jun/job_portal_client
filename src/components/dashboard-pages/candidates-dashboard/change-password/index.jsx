import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import Form from "./components/Form";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import { useEffect } from "react";
import { resetAuthenticatedSchema } from "@/validations/login";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { put } from "@/services/api";
import useUserInfo from "@/utils/hooks/useUserInfo";

const index = () => {
  const userInfo = useUserInfo()

  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(resetAuthenticatedSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      comparePassword: '',
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => put(`/user/reset`, userInfo._id, data),
    onSuccess: (res) => {
      toast.success(res.data.message)
    },
    onError: (err) => {
      toast.error(err.response.data.error)
    }
  })

  const handleRegisterSubmit = async (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorArray = Object.entries(errors);
      //console.log(errorArray)
      toast.error(errorArray[0][1].message)
    }
  }, [errors]);

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
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
          <BreadCrumb title="Change Password!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="ls-widget">
            <div className="widget-title">
              <h4>Change Password</h4>
            </div>

            <div className="widget-content">
              <Form watch={watch} register={register} setValue={setValue} error={errors} handleRegisterSubmit={handleRegisterSubmit} handleSubmit={handleSubmit} />
            </div>
          </div>
          {/* <!-- Ls widget --> */}
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
