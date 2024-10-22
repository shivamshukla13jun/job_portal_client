import { Link } from "react-router-dom";
import jobFeatured from "../../data/job-featured";
import { paths } from "@/services/paths";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/services/api";
import { API_EMPLOYER_PATH } from "@/lib/config";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";


const JobFeatured1 = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['job-6'],
    queryFn: async () => {
      let res = (await get('job?limit=6&sort=new')).data.data;
      return res;
    }
  });

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <>
      {data?.length > 0 && data.map((item) => (
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
                <Link to={`${paths.job}/${item?._id}`}>{capitalizeFirstLetter(item?.title)}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item?.company?.name}
                </li>
                {/* compnay info */}
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item?.location}
                </li>
                {/* location info */}
                <li>
                  <span className="icon flaticon-clock-3"></span> {item?.timing?.job}
                </li>
                {/* time info */}
                <li>
                  <span className="icon flaticon-money"></span>
                  ₹{item?.candidate_requirement?.salary_from} - ₹{item?.candidate_requirement?.salary_to}
                </li>
                {/* salary info */}
              </ul>
              {/* End .job-info */}

              <ul className="job-other-info">
                {item?.candidate_requirement?.skills?.map((val, i) => (
                  <li key={i} className={`required`}>
                    {val.label}
                  </li>
                ))}
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

export default JobFeatured1;
