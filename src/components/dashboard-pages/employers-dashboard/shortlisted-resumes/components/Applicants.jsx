import { Link } from "react-router-dom";
import candidatesData from "../../../../../data/candidates";
import { paths } from "@/services/paths";
import { API_CANDIDATE_PATH } from "@/lib/config";


const Applicants = ({ data }) => {
  return (
    <>
      {data?.length > 0 && data.map(({ candidate },i) => {
      return   <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={i}
        >
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <img
                  src={API_CANDIDATE_PATH+candidate?.profile?.filename}
                  alt="candidates"
                />
              </figure>
              <h4 className="name">
                <Link to={`${paths.candidate}/${candidate?._id}`}>
                  {candidate?.name}
                </Link>
              </h4>

              <ul className="candidate-info">
                <li className="designation">{candidate?.designation || "Designation"}</li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {candidate?.contact?.current_address?.country}
                </li>
                <li>
                  <span className="icon flaticon-money"></span>
                  ₹{candidate?.hourlyRate || '17000'}
                </li>
              </ul>
              {/* End candidate-info */}

              <ul className="post-tags">
                {candidate?.education?.map((val, i) => (
                  <li key={i}>
                    <a>{val.qualification}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* End content */}

            {/* <div className="option-box">
              <ul className="option-list">
                <li>
                  <button data-text="View Aplication">
                    <span className="la la-eye"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Approve Aplication">
                    <span className="la la-check"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Reject Aplication">
                    <span className="la la-times-circle"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Delete Aplication">
                    <span className="la la-trash"></span>
                  </button>
                </li>
              </ul>
            </div> */}
            {/* End admin options box */}
          </div>
        </div>
})}
    </>
  );
};

export default Applicants;
