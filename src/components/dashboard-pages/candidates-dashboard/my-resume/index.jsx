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

  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(resumeSchema),
    // defaultValues: {
    //   description: '',
    //   educations: [
    //     {
    //       degree: '',
    //       university: '',
    //       start_date: new Date(),
    //       end_date: new Date(),
    //       description: ''
    //     }
    //   ],
    //   work_experiences: [
    //     {
    //       position: '',
    //       company_name: '',
    //       start_date: new Date(),
    //       end_date: new Date(),
    //       description: ''
    //     }
    //   ],
    //   portfolio: {},
    //   portfoliolink:"",
    //   awards: [
    //     {
    //       award_name: '',
    //       start_date: new Date(),
    //       end_date: new Date(),
    //       description: ''
    //     }
    //   ],
    //   skills: [],
    //   current_salary: 0,
    //   expected_salary: 0,
    //   languages: [],
    //   social_media: {
    //     twitter: '',
    //     linkedIn: ''
    //   }
    // }
    defaultValues:{ 
      description: 'Passionate software engineer with 5+ years of experience in developing scalable web applications.',
  
      educations: [
          {
              degree: 'Bachelor of Technology (B.Tech)',
              university: 'Indian Institute of Technology (IIT) Bombay',
              start_date: new Date('2015-08-01'),
              end_date: new Date('2019-06-30'),
              description: 'Specialized in software engineering with a focus on backend development and cloud computing.',
          }
      ],
  
      work_experiences: [
          {
              position: 'Software Engineer',
              company_name: 'TechCorp Solutions',
              start_date: new Date('2019-07-01'),
              end_date: new Date('2022-05-15'),
              description: 'Developed and maintained core features of a cloud-based SaaS product. Led a team of 5 engineers and collaborated with cross-functional teams to improve product scalability and performance.',
          },
          {
              position: 'Senior Software Engineer',
              company_name: 'Innovative Solutions',
              start_date: new Date('2022-06-01'),
              end_date: new Date(),  // Current position
              description: 'Leading the architecture and development of a new microservices-based platform. Optimizing systems for high performance and low latency.',
          }
      ],
  
      portfolio: {   },
  
      portfoliolink: 'https://github.com/johndoe',
  
      awards: [
          {
              award_name: 'Employee of the Year',
              start_date: new Date('2021-12-01'),
              end_date: new Date('2021-12-31'),
              description: 'Recognized for exceptional performance in leading a critical project and delivering on-time results.',
          }
      ],
  
      skills: [
          { label: 'JavaScript', value: 'Expert' },
          { label: 'Node.js', value: 'Advanced' },
          { label: 'React', value: 'Advanced' },
          { label: 'AWS', value: 'Intermediate' },
          { label: 'Docker', value: 'Intermediate' },
      ],
  
      current_salary: 80000,  // Example salary in USD or INR as per your locale
      expected_salary: 100000,
  
      languages: [
          { label: 'English', value: 'Fluent' },
          { label: 'Hindi', value: 'Fluent' },
          { label: 'Spanish', value: 'Intermediate' },
      ],
  
      social_media: {
          twitter: 'https://twitter.com/johndoe',
          linkedIn: 'https://www.linkedin.com/in/johndoe',
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
          {
            position: '',
            company_name: '',
            start_date: '',
            end_date: '',
            description: ''
          }
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
