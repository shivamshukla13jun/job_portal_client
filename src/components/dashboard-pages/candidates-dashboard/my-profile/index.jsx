import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MobileMenu from "@/components/header/MobileMenu";
import DashboardCandidatesSidebar from "@/components/header/DashboardCandidatesSidebar";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";

import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";

import LoginPopup from "../../../common/form/login/LoginPopup";
import ContactInformation from "./components/ContactInformation";
import EducationalQualification from "./components/EducationalQualification";
import RegistrationCertification from "./components/RegistrationCertification";
import EmploymentDetail from "./components/EmploymentDetail";
import Reference from "./components/Reference";
import EnglishCertification from "./components/EnglishCertification";
import Conclusion from "./components/Conclusion";
import Profile from "./components/Profile";

import { candidateSchema } from "@/validations/dashboard/candidate";
import { getById, post, put, putMultiForm } from "@/services/api";
import { decrypt, encrypt } from "@/lib/encrypt";
import { userInfo } from "@/store/reducers/user";
import useUserInfo from "@/utils/hooks/useUserInfo";
import CoverLetter from "./components/CoverLetter";

const index = () => {
  const userInfo = useUserInfo();

  const { data, isLoading } = useQuery({
    queryKey: [`candidate${userInfo._id}`],
    queryFn: async () => {
      try {
        const res = await getById('/candidate', userInfo._id);
        return res.data.data;
      } catch (error) {
        if (error.response.data.error === 'Failed to find candidate') {
          toast.info('Please fill the information to get going!')
        }
      }
    },
    enabled: !!userInfo._id,
  });

  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(candidateSchema),
    defaultValues: {
      myProfile: {
        candidate_name: {
          title: '',
          first: '',
          middle: '',
          last: '',
        },
        designation:"",
        gender: '',
        dob: new Date(),
        marital_status: '',
        upload_cv: {},
        profile: {}
      },
      contact: {
        email: '',
        phone: '',
        permanent_address: {
          lane1: '',
          lane2: '',
          city: '',
          state: '',
          pin_code: '',
          country: ''
        },
        current_address: {
          lane1: '',
          lane2: '',
          city: '',
          state: '',
          pin_code: '',
          country: ''
        },
      },
      education: [
        {
          name: '',
          // from: new Date(),
          to: new Date(),
          qualification: '',
          // certificate: {},
        }
      ],
      "achievement": [],
      // registration_certificate: {},
      employment: [
        {
          name: '',
          position: '',
          department: '',
          categories:[],
          scope:"",
          from: new Date(),
          to: new Date(),
        }
      ],
      references: [
        {
          name: '',
          email: '',
          phone: '',
          note: ''
        }
      ],
      // english_language: {
      //   certification_attempted: '',
      //   recent_test: new Date(),
      //   test_score: {
      //     listening: 0,
      //     reading: 0,
      //     writing: 0,
      //     speaking: 0,
      //     overall: 0
      //   },
      //   score_card: {},
      // },
      // coverletter:"",
      hear_about_us: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => put(`/candidate`, userInfo._id, data),
    onSuccess: async (res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        // sessionStorage.setItem("session", res.data.token)
        let user = (await getById(`/user`, res.data.data.userId)).data.data;
        let enData = encrypt(user);
        sessionStorage.setItem("userInfo", enData);
        window.location.reload()
      }
    },
    onError: (err) => {
      toast.error(err.response.data.error)
    }
  });

  const handleRegisterSubmit = async (data) => {

    const formData = new FormData();

    const name = `${data.myProfile.candidate_name.title} ${data.myProfile.candidate_name.first} ${data.myProfile.candidate_name.middle} ${data.myProfile.candidate_name.last}`;
    const formattedData = {
      name,coverletter:data.coverletter,
      gender: data.myProfile.gender,
      designation:data.myProfile.designation,
      email: data.contact.email,
      dob: data.myProfile.dob,
      marital_status: data.myProfile.marital_status,
      contact: data.contact,
      education: data.education,
      employment: data.employment,
      references: data.references,
      english_language: data.english_language,
      hear_about_us: watch("hear_about_us").split(","),
      cv: data.myProfile.upload_cv,
      profile: data.myProfile.profile,
      "achievement": data.achievement,
      // registration_certificate: data.registration_certificate,
    }

    formData.append("parse", JSON.stringify(formattedData))

    formData.append("upload_cv", watch("myProfile.upload_cv"));
    formData.append("profile", watch("myProfile.profile"));
    // formData.append("registration_certificate", watch("registration_certificate"));
    // formData.append("score_card", watch("english_language.score_card"));

    // if (data.education.length > 0) {
    //   data.education.forEach((_, index) => formData.append("certificate[]", watch(`education.${index}.certificate`)));
    // }
    mutation.mutate(formData);
  };

  useEffect(() => {
    if (data) {
      reset({
        myProfile: {
          candidate_name: {
            title: data.name.split(" ")[0],
            first: data.name.split(" ")[1],
            middle: data.name.split(" ")[2],
            last: data.name.split(" ")[3],
          },
          designation:data.designation,
          gender: data.gender,
          dob: new Date(data.dob),
          marital_status: data.marital_status,
          upload_cv: data.cv,
          profile: data.profile,
        },
        contact: {
          email: data.contact.email,
          phone: data.contact.phone,
          permanent_address: data.contact.permanent_address,
          current_address: data.contact.current_address,
        },
        education: data.education.map(edu => ({
          ...edu,
          // from: new Date(edu.from),
          to: new Date(edu.to),
        })),
        // registration_certificate: data.registration_certificate,
        employment: data.employment.map(emp => ({
          ...emp,
          from: new Date(emp.from),
          to: new Date(emp.to),
        })),
        references: data.references,
        // english_language: {
        //   ...data.english_language,
        //   recent_test: new Date(data.english_language.recent_test),
        // },
        // coverletter:data.coverletter || "",
        hear_about_us: data.hear_about_us.join(","),
      });
    }

    return () => {
      reset();
    }

  }, [data, reset]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log({errors})
      const errorArray = Object.entries(errors);
      toast.error(errorArray[0][0].toUpperCase() + ' section needs to be filled!')
    }
  }, [errors])
console.log("data",data)
  if (isLoading) return <div>Loading...</div>;

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
        <form className="dashboard-outer" >
          <BreadCrumb title="My Profile!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Profile</h4>
                  </div>
                  <div className="widget-content">
                    <Profile watch={watch} register={register} setValue={setValue} error={errors} />
                  </div>
                </div>
              </div>
              {/* <!-- My Profile --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Contact Information</h4>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    <ContactInformation watch={watch} register={register} setValue={setValue} error={errors} />
                  </div>
                </div>
              </div>
              {/* <!-- Contact Information --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Educational Qualification</h4>
                  </div>
                  {/* End widget-title */}
                  <div className="widget-content">
                    <EducationalQualification watch={watch} register={register} setValue={setValue} error={errors} />
                  </div>
                </div>
              </div>
              {/* <!-- Educational Qualification --> */}

              {/* <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title flex-column align-items-start">
                    <h4>Registrations & Certifications</h4>
                    <p>Please note that by providing this information you are consenting to us to conduct reference checks.</p>
                  </div>
                  <div className="widget-content">
                    <RegistrationCertification watch={watch} register={register} setValue={setValue} error={errors} />
                  </div>
                </div>
              </div> */}
              {/* <!-- Registrations & Certifications --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Employment History</h4>
                  </div>
                  {/* End widget-title */}
                  <div className="widget-content">
                    <EmploymentDetail watch={watch} register={register} setValue={setValue} error={errors} />
                  </div>
                </div>
              </div>
              {/* <!-- Employment History --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title flex-column align-items-start">
                    <h4>References</h4>
                    <p>Work / Personal references.</p>
                  </div>
                  {/* End widget-title */}
                  <div className="widget-content">
                    <Reference watch={watch} register={register} setValue={setValue} error={errors} />
                  </div>
                </div>
              </div>
              {/* <!-- References --> */}

              {/* <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title flex-column align-items-start">
                    <h4>English Language Certifications</h4>
                    <p>IELTS / OET</p>
                  </div>
                  <div className="widget-content">
                    <EnglishCertification watch={watch} register={register} setValue={setValue} error={errors} />
                  </div>
                </div>
              </div> */}
              {/* <!-- English Language Certifications --> */}

              {/* <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Cover Letter</h4>
                  </div>
                  <div className="widget-content">
                 <CoverLetter watch={watch} register={register} setValue={setValue} error={errors}/>
                  </div>
                </div>
              </div> */}
              {/* <!-- Conclusion --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Conclusion</h4>
                  </div>
                  {/* End widget-title */}
                  <div className="widget-content">
                    <Conclusion watch={watch} register={register} setValue={setValue} error={errors} />
                  </div>
                </div>
              </div>
              {/* <!-- Conclusion --> */}
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
        </form>
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
