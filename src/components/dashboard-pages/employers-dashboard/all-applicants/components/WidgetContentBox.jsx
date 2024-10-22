import candidatesData from "../../../../../data/candidates";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "@/services/paths";
import { API_CANDIDATE_PATH } from "@/lib/config";

const WidgetContentBox = ({ data, acceptMutation, declineMutation }) => {

  const navigate = useNavigate();

  const handleAccept = (item) => {
    acceptMutation.mutate(item);
  };

  const handleReject = (item) => {
    declineMutation.mutate(item);
  };

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>{data?.title}</h6>

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals"> Total(s): {data?.candidate_applied?.length > 0 && Object.keys(data?.candidate_applied?.[0]).length > 0 ? data?.candidate_applied?.length : 0}</Tab>
              <Tab className="tab-btn approved"> Approved: {data?.candidate_shortlisted?.length > 0 && Object.keys(data?.candidate_shortlisted?.[0]).length > 0 ? data?.candidate_shortlisted?.length : 0}</Tab>
              <Tab className="tab-btn rejected"> Rejected(s): {data?.candidate_rejected?.length > 0 && Object.keys(data?.candidate_rejected?.[0]).length > 0 ? data?.candidate_rejected?.length : 0}</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row">
                {data?.candidate_applied?.length > 0 && Object.keys(data?.candidate_applied?.[0]).length > 0 && data.candidate_applied.map(({ candidateId }) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidateId?._id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <img
                            src={API_CANDIDATE_PATH+candidateId?.profile?.filename}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link to={`${paths.publiccandidate}/${candidateId?._id}`}>
                            {candidateId?.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {candidateId?.designation || "Designation"}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidateId?.contact?.current_address?.country}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>
                            ₹{candidateId?.hourlyRate || '17000'}
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                          {candidateId?.education?.map((val, i) => (
                            <li key={i}>
                              <a>{val.qualification}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* End content */}

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Aplication" onClick={() => navigate(`${paths.publiccandidate}/${candidateId._id}`)}>
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Approve Aplication" onClick={() => handleAccept(candidateId._id)}>
                              <span className="la la-check"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Reject Aplication" onClick={() => handleReject(candidateId._id)}>
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                          {/* <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li> */}
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            {/* End total applicants */}

            <TabPanel>
              <div className="row">
                {data?.candidate_shortlisted?.length > 0 && Object.keys(data?.candidate_shortlisted?.[0]).length > 0 && data.candidate_shortlisted.map(({ candidateId }) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidateId._id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <img

                            src={API_CANDIDATE_PATH+candidateId?.profile?.filename}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link to={`${paths.publiccandidate}/${candidateId?._id}`}>
                            {candidateId?.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {candidateId?.designation || "Designation"}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidateId?.contact?.current_address?.country}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>
                            ₹{candidateId?.hourlyRate || '17000'}
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                          {candidateId?.education?.map((val, i) => (
                            <li key={i}>
                              <a>{val.qualification}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* End content */}

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Aplication" onClick={() => navigate(`${paths.publiccandidate}/${candidateId._id}`)}>
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          {/* <li>
                            <button data-text="Approve Aplication" onClick={() => handleAccept(candidateId._id)}>
                              <span className="la la-check"></span>
                            </button>
                          </li> */}
                          <li>
                            <button data-text="Reject Aplication" onClick={() => handleReject(candidateId._id)}>
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                          {/* <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li> */}
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            {/* End approved applicants */}

            <TabPanel>
              <div className="row">
                {data?.candidate_rejected?.length > 0 && Object.keys(data?.candidate_rejected?.[0]).length > 0 && data.candidate_rejected.map(({ candidateId }) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidateId._id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <img

                            src={API_CANDIDATE_PATH+candidateId?.profile?.filename}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link to={`${paths.publiccandidate}/${candidateId?._id}`}>
                            {candidateId?.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {candidateId?.designation || "Designation"}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidateId?.contact?.current_address?.country}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>
                            ₹{candidateId?.hourlyRate || '17000'}
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                          {candidateId?.education?.map((val, i) => (
                            <li key={i}>
                              <a>{val.qualification}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* End content */}

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Aplication" onClick={() => navigate(`${paths.publiccandidate}/${candidateId._id}`)}>
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Approve Aplication" onClick={() => handleAccept(candidateId._id)}>
                              <span className="la la-check"></span>
                            </button>
                          </li>
                          {/* <li>
                            <button data-text="Reject Aplication" onClick={() => handleReject(candidateId._id)}>
                              <span className="la la-times-circle"></span>
                            </button>
                          </li> */}
                          {/* <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li> */}
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            {/* End rejected applicants */}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetContentBox;
