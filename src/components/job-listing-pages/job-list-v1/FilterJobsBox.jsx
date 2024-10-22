import { API_EMPLOYER_PATH } from "@/lib/config";
import { paths } from "@/services/paths";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FilterJobsBox = ({ jobs, search, queryParams, setSearch }) => {
const navigate=useNavigate()
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
                    experience_from: 0,
                    experience_to: 1,
                    salary_from: 0,
                    salary_to: 10_000,
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

                <button className="bookmark-btn">
                  <span className="flaticon-bookmark"></span>
                </button>
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
