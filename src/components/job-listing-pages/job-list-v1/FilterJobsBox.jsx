import { API_EMPLOYER_PATH } from "@/lib/config";
import { paths } from "@/services/paths";
import { addToWishlist, fetchWishlist, selectWishlist, selectWishlistLoading } from "@/store/reducers/Whishlist";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useWhishlist } from "@/utils/hooks/useWhishlist";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FilterJobsBox = ({ jobs, search, queryParams, setSearch,data }) => {
  //console.log("data????????????//",data)
const userInfo=useUserInfo()
const navigate=useNavigate()
const dispatch = useDispatch();
const SavedJobs = useSelector(selectWishlist);
const isLoading = useSelector(selectWishlistLoading);


const handleWishist = async (id, operation) => {
  if (!userInfo._id) {
    toast.info('Please login as Candidate to Save Job.');
    return;
  }
  if (id && operation) {
    dispatch(addToWishlist({ id, operation }));
  }
};
  const handleSearch = () => {
    if (jobs?.count <= ((search.page + 1) * search.limit)) {
      toast.error(`No more jobs available`)
      return;
    }

    setSearch((prev) => ({ ...prev, page: ++prev.page }))
  }
  return (
    <>
      <div className="ls-switcher">
        <div className="show-result">
          <div className="show-1023">
            <button
              type="button"
              className="theme-btn toggle-filters "
              data-bs-toggle="offcanvas"
              data-bs-target="#filter-sidebar"
            >
              <span className="icon icon-filter"></span> Filter
            </button>
          </div>
          {/* Collapsible sidebar button */}

          <div className="text">
            Show <strong>{jobs?.count}</strong> jobs
          </div>
        </div>
        {/* End show-result */}

        <div className="sort-by">
          {
            Object.entries(search)
              .filter(([key]) => !['page', 'limit', 'sort'].includes(key))
              .some(([, value]) => value !== '') &&
            (
              <button
                className="btn btn-danger text-nowrap me-2"
                style={{ minHeight: "45px", marginBottom: "15px" }}
                onClick={() =>
                {
                  navigate(window.location.pathname+ "?keyword=&location=")
                  setSearch({
                    page: 0,
                    limit: 10,
                    keyword:  '',
                    location:  '',
                    categories: '',
                    job_type: '',
                    date_posted: '',
                    clear:true,
                    experience_from: 0,
                    salary_from: 0,
                    salary_to:data?.maxsalary?.candidate_requirement?.salary_to || 30000,
                     experience_to:data?.maxeperience?.candidate_requirement?.experience || 10,
                    tags: [],
                    sort: 'new'
                  })
                }
                 }
              >
                Clear All
              </button>
            )
          }

          <select className="chosen-single form-select" defaultValue={search?.sort} onChange={(e) => setSearch((prev) => ({ ...prev, sort: e.target.value }))}>
            <option value="" hidden>Sort by (default)</option>
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
          </select>

        </div>
      </div>
      {/* End top filter bar box */}
      {jobs?.data?.length > 0 && jobs.data.map((item, index) => {
        return (
          <div className="job-block" key={item._id}>
            <div className="inner-box">
              <div className="content">
                <span className="company-logo">
                  <img src={API_EMPLOYER_PATH + item?.employerId?.logo?.filename} alt="item brand" />
                </span>
                <h4>
                  <Link to={`${paths.job}/${item?._id}`}>{capitalizeFirstLetter(item?.title)}</Link>
                </h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {item?.company?.name}
                  </li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {item?.location}
                  </li>
                  <li>
                    <span className="icon flaticon-clock-3"></span>
                    {item?.timing?.job}
                  </li>
                  <li>
                    <span className="icon flaticon-money"></span>
                    ₹{item?.candidate_requirement?.salary_from} - ₹{item?.candidate_requirement?.salary_to}
                  </li>
                </ul>

                <ul className="job-other-info">
                  {item?.candidate_requirement?.skills?.map((val, i) => (
                    <li key={i} className={`required`}>
                      {val.label}
                    </li>
                  ))}
                </ul>
                {
                  !isLoading &&    <button className={`bookmark-btn ${SavedJobs.includes(item?._id)?"disable":"" }`}  type="button" onClick={()=>handleWishist(item?._id,SavedJobs.includes(item?._id)?"remove":"add")}>
                  <span className="flaticon-bookmark"></span>
                </button>
                }
             
              </div>
            </div>
          </div>
          // End all jobs
        )
      }
      )}
      {/* <!-- List Show More --> */}
      {jobs.count > 0 && (
        <div className="ls-show-more">
          <p>Show {jobs?.count <= search.limit || jobs?.count <= ((search.page + 1) * search.limit) ? jobs?.count : (search.page + 1) * search.limit}  of {jobs?.count} Jobs</p>
          <div className="bar">
            <span className="bar-inner" style={{ width: "40%" }}></span>
          </div>
          <button className="show-more" onClick={handleSearch}>Show More</button>
        </div>
      )}
    </>
  );
};

export default FilterJobsBox;
