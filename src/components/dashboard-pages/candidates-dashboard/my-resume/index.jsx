import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import Resume from "./components/Resume";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { getById, put } from "@/services/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resumeSchema } from "@/validations/dashboard/candidate/resume";
import { useEffect } from "react";

const index = () => {
  const userInfo = useUserInfo();
  const queryClient = new QueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [`resume/candidate${userInfo._id}`],
    queryFn: async () => {
      try {
        let res = (await getById('/resume/candidate', userInfo._id)).data.data;
        return res;
      } catch (error) {
        if (error.response.data.error === 'Failed to find resume') {
          toast.info('Please fill the information to get going!')
        }
      }
    },
    enabled: !!userInfo._id
  });

  const { register, handleSubmit, watch, formState: { errors },control, setValue, reset } = useForm({
    resolver: yupResolver(resumeSchema),
    defaultValues: {
      description: '',
      educations: [
        {
          degree: '',
          university: '',
          start_date: new Date(),
          end_date: new Date(),
          description: ''
        }
      ],
      work_experiences: [
        // {
        //   position: '',
        //   company_name: '',
        //   start_date: new Date(),
        //   end_date: new Date(),
        //   description: ''
        // }
      ],
      portfolio: {},
      portfoliolink:"",
      awards: [
        {
          award_name: '',
          start_date: new Date(),
          end_date: new Date(),
          description: ''
        }
      ],
      skills: [],
      current_salary: 0,
      expected_salary: 0,
      languages: [],
      social_media: {
        twitter: '',
        linkedIn: ''
      }
    }
  
  });

  const mutation = useMutation({
    mutationFn: (data) => put('/resume', userInfo._id, data),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        queryClient.invalidateQueries([`resume${userInfo._id}`]);
      }
    },
    onError: (err) => {
      toast.error(err.response.data.error)
    }
  });

  const handleRegisterSubmit = async (data) => {
    const formData = new FormData();

    const formattedData = {
      portfoliolink:data.portfoliolink,
      description: data.description,
      educations: data.educations,
      work_experiences: data.work_experiences,
      portfolio: data.portfolio,
      awards: data.awards,
      skills: data.skills,
      current_salary: data.current_salary,
      expected_salary: data.expected_salary,
      languages: data.languages,
      social_media: data.social_media
    }

    formData.append("parse", JSON.stringify(formattedData));
    formData.append("portfolio", watch("portfolio"));

    mutation.mutate(formData);
  };

  useEffect(() => {
    if (data) {
      reset({
        description: data.description || '',
        educations: data.educations || [
          {
            degree: '',
            university: '',
            start_date: '',
            end_date: '',
            description: ''
          }
        ],
        work_experiences: data.work_experiences || [
          // {
          //   position: '',
          //   company_name: '',
          //   start_date: '',
          //   end_date: '',
          //   description: ''
          // }
        ],
        portfolio: data.portfolio || {},
        portfoliolink: data.portfoliolink || "",
        awards: data.awards || [
          {
            award_name: '',
            start_date: '',
            end_date: '',
            description: ''
          }
        ],
        skills: data.skills || [
          {
            label: '',
            value: ''
          }
        ],
        current_salary: data.current_salary || 0,
        expected_salary: data.expected_salary || 0,
        languages: data.languages || [
          {
            label: '',
            value: ''
          }
        ],
        social_media: {
          twitter: data.social_media?.twitter || '',
          linkedIn: data.social_media?.linkedIn || ''
        }
      });
    }

    return () => {
      reset();
    }

  }, [data, reset]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const orderedFields = [
        'description',
        'educations',
        'work_experiences',
        'portfolio',
        'awards',
        'skills',
        'current_salary',
        'expected_salary',
        'languages',
        'social_media'
      ];

      for (const field of orderedFields) {
        if (errors[field]) {
          toast.error(errors[field].message || `${field.toUpperCase()} section needs to be filled!`);
          break;
        }
      }
    }
  }, [errors]);
console.log("work_experiences?????????????",watch('work_experiences'))
  if (isLoading) return <div>Loading...</div>

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
          <BreadCrumb title="My Resume!" />
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
                  {/* End widget-title */}

                  <div className="widget-content">
                    <Resume
                      watch={watch}
                      register={register}
                      setValue={setValue}
                      error={errors}
                      handleSubmit={handleSubmit}
                      handleRegisterSubmit={handleRegisterSubmit}
                      control={control}
                    />
                  </div>
                  {/* End widget-content */}
                </div>
              </div>
              {/* End ls-widget */}
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
