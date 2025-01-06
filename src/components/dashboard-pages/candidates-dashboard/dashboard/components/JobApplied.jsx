import { Link } from "react-router-dom";
import recentJobApplied from "../../../../../data/job-featured";
import { paths } from "@/services/paths";
import { API_EMPLOYER_PATH } from "@/lib/config";


const JobApplied = ({data}) => {
  return (
    <>
      {Array.isArray(data) &&data?.map((item) => (
        <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item._id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img

                  src={API_EMPLOYER_PATH + item?.employerId?.logo?.filename}
                  alt="item brand"
                />
              </span>
              <h4>
                <Link to={`${paths.job}/${item._id}`}>{item.title}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item?.employerId?.business_name}
                </li>
                {/* compnay info */}
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.location}
                </li>
                {/* location info */}
                <li>
                  <span className="icon flaticon-clock-3"></span> {item?.createdAt}
                </li>
                {/* time info */}
                <li>
                  <span className="icon flaticon-money"></span>  ₹{item?.candidate_requirement?.salary_from} - ₹{item?.candidate_requirement?.salary_to}
                </li>
                {/* salary info */}
              </ul>
              {/* End .job-info */}

              <ul className="job-other-info">
                  <li  className={`time text-capitalize`}>
                    {item?.jobtype}
                  </li>

              </ul>
              {/* End .job-other-info */}

              <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
        // End job-block
      ))}
    </>
  );
};

export default JobApplied;
