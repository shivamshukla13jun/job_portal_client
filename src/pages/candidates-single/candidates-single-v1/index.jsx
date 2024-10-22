import candidates from "@/data/candidates";
import candidateResume from "@/data/candidateResume";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Contact from "@/components/candidates-single-pages/shared-components/Contact";
import GalleryBox from "@/components/candidates-single-pages/shared-components/GalleryBox";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import AboutVideo from "@/components/candidates-single-pages/shared-components/AboutVideo";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useQuery } from "@tanstack/react-query";
import { getById } from "@/services/api";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import { API_CANDIDATE_PATH } from "@/lib/config";

const metadata = {
  title:
    "Candidate Single Dyanmic V1 || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const CandidateSingleDynamicV1 = () => {
  let params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: [`resume${id}`],
    queryFn: async () => {
      let res = (await getById('resume', id)).data.data;
      return res;
    }
  });

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <DefaulHeader2 />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="candidate-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-five">
              <div className="inner-box">
                <div className="content">
                  <figure className="image">
                    <img src={API_CANDIDATE_PATH + data?.candidateId?.profile?.filename} alt="avatar" />
                  </figure>
                  <h4 className="name">{data?.candidateId?.name}</h4>

                  <ul className="candidate-info">
                    <li className="designation">{data?.designation || 'Default Designation'}</li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {`${data?.candidateId?.contact?.permanent_address?.state}, ${data?.candidateId?.contact?.permanent_address?.country}`}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>
                      ₹ {data?.expected_salary} / month
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span>
                      Member {new Date(data?.candidateId?.createdAt).toDateString()}
                    </li>
                  </ul>

                  <ul className="post-tags">
                    {data?.skills?.slice(0, 3)?.map((val, i) => (
                      <li key={i}>{val.label}</li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
                  <a
                    className="theme-btn btn-style-one"
                    href="/images/sample.pdf"
                    download
                  >
                    Download CV
                  </a>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>
            {/*  <!-- Candidate block Five --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <div className="video-outer">
                    <h4>Candidates About</h4>
                    {/* <AboutVideo /> */}
                  </div>
                  {/* <!-- About Video Box --> */}
                  <p>
                    {data?.description}
                  </p>

                  {/* <!-- Portfolio --> */}
                  {/* <div className="portfolio-outer">
                    <div className="row">
                      <GalleryBox />
                    </div>
                  </div> */}

                  {/* <!-- Candidate Resume Start --> */}
                  <div className={`resume-outer`}>
                    <div className="upper-title">
                      <h4>{'Education'}</h4>
                    </div>

                    {data?.educations?.length > 0 && data.educations.map((education) => (
                      <div className="resume-block" key={education._id}>
                        <div className="inner">
                          <span className="name">{education.degree[0]?.toUpperCase()}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{education.degree}</h3>
                              <span>{education.university}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">{`${new Date(education.start_date).getFullYear()} - ${new Date(education.end_date).getFullYear()}`}</span>
                            </div>
                          </div>
                          <div className="text">{education.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`resume-outer theme-blue`}>
                    <div className="upper-title">
                      <h4>{'Work & Experience'}</h4>
                    </div>

                    {data?.work_experiences?.length > 0 && data.work_experiences.map((workExp) => (
                      <div className="resume-block" key={workExp._id}>
                        <div className="inner">
                          <span className="name">{workExp.position[0]?.toUpperCase()}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{workExp.position}</h3>
                              <span>{workExp.company_name}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">{`${new Date(workExp.start_date).getFullYear()} - ${new Date(workExp.end_date).getFullYear()}`}</span>
                            </div>
                          </div>
                          <div className="text">{workExp.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`resume-outer theme-yellow`}>
                    <div className="upper-title">
                      <h4>{'Awards'}</h4>
                    </div>

                    {data?.awards?.length > 0 && data.awards.map((award) => (
                      <div className="resume-block" key={award._id}>
                        <div className="inner">
                          <span className="name">{award.award_name[0]?.toUpperCase()}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{award.award_name}</h3>
                              <span>{ }</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">{`${new Date(award.start_date).getFullYear()} - ${new Date(award.end_date).getFullYear()}`}</span>
                            </div>
                          </div>
                          <div className="text">{award.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <!-- Candidate Resume End --> */}
                </div>
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>0-2 Years</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>{new Date().getFullYear() - new Date(data?.candidateId?.dob).getFullYear()} Year</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>₹ {data?.current_salary}</span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>₹ {data?.expected_salary}</span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>{data?.candidateId?.gender}</span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>{data?.languages?.map(item => item.value).join(", ")}</span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>Master Degree</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social data={data} />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget social-media-widget */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills data={data} />
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}

                  {/* <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div> */}
                  {/* End .sidebar-widget contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default CandidateSingleDynamicV1;
