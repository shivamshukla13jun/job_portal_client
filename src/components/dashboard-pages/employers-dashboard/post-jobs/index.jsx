import { useEffect } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";

import JobInformation from "./components/JobInformation";
import CandidateRequirement from "./components/CandidateRequirement";
import PersonalDetails from "./components/PersonalDetails";
import AboutCompany from "./components/AboutCompany";
import Timing from "./components/Timing";

import { paths } from "@/services/paths";
import { post } from "@/services/api";
import { jobSchema } from "@/validations/dashboard/employer/job";
import useUserInfo from "@/utils/hooks/useUserInfo";

const index = () => {

  const userInfo = useUserInfo();
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      title: '',
      location: '',
      place: '',
      age: 18,
      categories: [],
      opening: 1,
      jobtype:"",
      candidate_requirement: {
        experience: '',
        salary_from: 10000,
        salary_to: 12000,
        bonus: false,
        job_info: '',
        skills: [],
      },
      personal_info: [
        {
          info: '',
          assets: []
        }
      ],
      timing: {
        job: '',
        interview: ''
      },
      company: {
        name: '',
        contact_person: '',
        phone: '',
        email: '',
        contact_person_profile: '',
        size_of_org: 20,
        job_address: '',
        vacancy: '',
      }
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => post(`/job`, data),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(paths.manage_jobs);
        queryClient.invalidateQueries([`jobs${userInfo._id}`])
      }
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.response.data.error)
    }
  });

  const handleRegisterSubmit = async (data) => {
    mutation.mutate(data)
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorArray = Object.entries(errors);
      toast.error(errorArray[0][0].toUpperCase() + ' section needs to be filled!')
    }
  }, [errors]);

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
        <form className="dashboard-outer" >
          <div className="dashboard-outer">
            <BreadCrumb title="Post a New Job!" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Post Job</h4>
                    </div>

                    <div className="widget-content">
                      <JobInformation watch={watch} register={register} setValue={setValue} error={errors} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Candidate Requirement</h4>
                    </div>

                    <div className="widget-content">
                      <CandidateRequirement watch={watch} register={register} setValue={setValue} error={errors} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Personal details, Education, additional info</h4>
                    </div>

                    <div className="widget-content">
                      <PersonalDetails watch={watch} register={register} setValue={setValue} error={errors} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Timing</h4>
                    </div>

                    <div className="widget-content">
                      <Timing watch={watch} register={register} setValue={setValue} error={errors} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>About your Company</h4>
                    </div>

                    <div className="widget-content">
                      <AboutCompany watch={watch} register={register} setValue={setValue} error={errors} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  onClick={handleSubmit(handleRegisterSubmit)}
                  className="theme-btn btn-style-one"
                >
                  Submit
                </button>
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End dashboard-outer */}
        </form>
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
