import { Link, useNavigate } from "react-router-dom";
import { API_EMPLOYER_PATH } from "@/lib/config.js";
import { paths } from "@/services/paths.js";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter.js";

const JobFavouriteTable = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Favorite Jobs</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data?.shortListedJobs?.length > 0 && data.shortListedJobs.map((item) => {
                  const { jobId } = item;
                  if (!jobId || !jobId._id || !jobId.title || !jobId.company) {
                    return null;
                  }

                  return (
                    <tr key={item?._id}>
                      <td>
                        {/* <!-- Job Block --> */}
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <img
                                  src={API_EMPLOYER_PATH + item?.jobId?.employerId?.logo?.filename}
                                  alt="logo"
                                />
                              </span>
                              <h4>
                                <Link to={`${paths.job}/${item?.jobId?._id}`}>{capitalizeFirstLetter(item?.jobId?.title)}</Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {item?.jobId?.company?.name}
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {item?.jobId?.location}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{new Date(item?.date).toDateString()}</td>
                      <td className="status">Active</td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Aplication" onClick={() => navigate(`${paths.job}/${item?.jobId?._id}`)}>
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                            {/* <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li> */}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobFavouriteTable;
