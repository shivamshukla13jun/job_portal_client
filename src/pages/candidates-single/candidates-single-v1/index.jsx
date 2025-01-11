
import FooterDefault from "@/components/footer/common-footer";
import MobileMenu from "@/components/header/MobileMenu";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import { useParams } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import { useQuery } from "@tanstack/react-query";
import {  getById } from "@/services/api";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import { API_CANDIDATE_PATH } from "@/lib/config";
import { toast } from "react-toastify";
import useForwardCV from "@/utils/hooks/useForwardCV";
import useUserInfo from "@/utils/hooks/useUserInfo";
import ForwardCVModal from "./ForwardCVModal";
import { useState } from "react";
import { useAcceptApplication } from "@/utils/hooks/useApplication";

const metadata = {
  title:
    "Candidate Single Dyanmic V1 || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const CandidateSingleDynamicV1 = () => {
  let params = useParams();
  const userInfo=useUserInfo()
  const [isForwardModalOpen, setIsForwardModalOpen] = useState(false);
  const handleAccept=useAcceptApplication()
  const id = params.id;
  const { handleForwardCV, isLoading: isForwarding } = useForwardCV();
  
  const { data, isLoading } = useQuery({
    queryKey: [`resume${id}`],
    queryFn: async () => {
      let res = (await getById('resume', id)).data.data;
      return res;
    }
  });

  const { data: SubEmployers = [], isLoading: SubEmployersLoading } = useQuery({
    queryKey: [`employer/getSubEmployers`, id],
    queryFn: async () => {
      let res = (await getById('employer/getSubEmployers', userInfo?.userTypeValue?._id)).data.data;
      return res;
    },
    enabled: Boolean(userInfo?.userTypeValue?._id)
  });
  function calculateTotalExperience(employmentArray=[]) {
    let totalExperienceMonths = 0;
    if(employmentArray.length===0 ){
      return ""
    }
    employmentArray.forEach(job => {
        const from = new Date(job.from);
        const to =new Date( job.to)

        // Calculate the duration in months
        const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
        totalExperienceMonths += months;
    });

    // Convert months to years
    const totalExperienceYears = totalExperienceMonths / 12;

    // Classify into 0-3 years, 3-5 years, etc.
    if (totalExperienceYears >= 0 && totalExperienceYears < 1) {
        return "0-1 years";
    } 
   else  if (totalExperienceYears >= 0 && totalExperienceYears < 2) {
        return "0-2 years";
    } 
    else if (totalExperienceYears >= 0 && totalExperienceYears < 3) {
        return "0-3 years";
    } 
    else if (totalExperienceYears >= 3 && totalExperienceYears < 5) {
        return "3-5 years";
    } else {
        return "5+ years";
    }
}
  const handleDownload = async () => {
    const fileUrl = API_CANDIDATE_PATH + data?.cv?.filename;
  
    try {
      // Fetch the file data
      const response = await fetch(fileUrl);
      const blob = await response.blob(); // Get the file as a Blob
  
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Create an object URL for the Blob
      link.download = data?.cv?.filename; // Set the filename for download
  
      // Append the link to the body, trigger the click, then remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.info('Download failed');
    }
  };

 //console.log("SubEmployers",SubEmployers)
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
                    <img src={API_CANDIDATE_PATH + data?.profile?.filename} alt="avatar"                       onError={(e) => e.target.src = "/images/resource/candidate.png"}
 />
                  </figure>
                  <h4 className="name">{data?.name}</h4>

                  <ul className="candidate-info">
                    <li className="designation">{data?.designation || ''}</li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {`${data?.contact?.permanent_address?.state}, ${data?.contact?.permanent_address?.country}`}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>
                      ₹ {data?.expectedsalary} / LPA
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span>
                      Member {new Date(data?.createdAt).toDateString()}
                    </li>
                  </ul>

                  <ul className="post-tags">
                    {data?.skills?.slice(0, 3)?.map((val, i) => (
                      <li key={i}>{val.label}</li>
                    ))}
                  </ul>
                </div>

                <div className="d-flex">
                  <a
                    className="theme-btn btn-style-one me-2"
                    onClick={handleDownload}
                  >
                    Download CV
                  </a>

                  <a
                    className="theme-btn btn-style-one me-2"
                    onClick={()=>{
                      data?.status!=="shortlisted" && handleAccept(id, "shortlisted")

                    }}
                    disabled={data?.status=="shortlisted"}

                  >
                    {`Select${data?.status=="shortlisted" ?"ed":""}`} CV
                  </a>
                  {
                    userInfo && userInfo?.userType?.name?.toLowerCase() === 'employer' && 
                    <a
                    className="theme-btn btn-style-one"
                    disabled={isForwarding}
                    onClick={() => setIsForwardModalOpen(true)}
                  >
                  {isForwarding ? 'Forwarding...' : 'Forward CV'}

                  </a>
                  }
                 
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
                  <div className={`resume-outer container`}>
                    <div className="upper-title">
                      <h4>{'Education'}</h4>
                    </div>

                    {data?.education?.length > 0 && data.education.map((item) => (
                      <div className="resume-block" key={item._id}>
                        <div className="inner">
                          {/* <span className="name">{item.qualification?.toUpperCase()}</span> */}
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{item.qualification}</h3>
                              <span>{item.name}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">{`${new Date(item.to).getFullYear()}`}</span>
                            </div>
                          </div>
                          {/* <div className="text">{item.description}</div> */}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`resume-outer theme-blue container`}>
                    <div className="upper-title">
                      <h4>{'Work & Experience'}</h4>
                    </div>

                    {data?.employment?.length > 0 ? data.employment.map((workExp) => (
                      <div className="resume-block" key={workExp._id}>
                        <div className="inner">
                          {/* <span className="name">{workExp.position?.toUpperCase()}</span> */}
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{workExp.position}</h3>
                              <span>{workExp.name}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">{`${new Date(workExp.from).getFullYear()} - ${new Date(workExp.to).getFullYear()}`}</span>
                            </div>
                          </div>
                          <div className="text">{workExp?.description}</div>
                        </div>
                      </div>
                    )):<></>}
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
                          <span>{data?.employment ?calculateTotalExperience(data?.employment):""}</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>{new Date().getFullYear() - new Date(data?.dob).getFullYear()} Year</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>₹ {data?.currentsalary} LPA</span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>₹ {data?.expectedsalary} LPA</span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>{data?.gender}</span>
                        </li>

                        {/* <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>{data?.languages?.map(item => item.value).join(", ")}</span>
                        </li> */}

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>
                             {data?.education?.map((val, i,arr) => (
                            
                                <a>{val.qualification}</a>
                            
                            ))}
                            </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  {/* <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social data={data} />
                      </div>
                    </div>
                  </div> */}
                  {/* End .sidebar-widget social-media-widget */}

                  {/* <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills data={data} />
                      </ul>
                    </div>
                  </div> */}
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
 {/* Forward CV Modal */}
      <ForwardCVModal
        isOpen={isForwardModalOpen}
        onClose={() => setIsForwardModalOpen(false)}
        subEmployers={SubEmployers}
        applicationid={id}
        onForward={handleForwardCV}
        SubEmployersLoading={SubEmployersLoading}
      />

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default CandidateSingleDynamicV1;
