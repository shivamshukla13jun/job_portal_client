import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import ListingShowing from "../components/ListingShowing";
import { useDispatch, useSelector } from "react-redux";
import {
  addCandidateGender,
  addCategory,
  addDatePost,
  addDestination,
  addKeyword,
  addLocation,
  addPerPage,
  addSort,
  clearExperienceF,
  clearQualificationF,
} from "../../../features/filter/candidateFilterSlice";
import {
  clearDatePost,
  clearExperience,
  clearQualification,
} from "../../../features/candidate/candidateSlice";
import { get } from '@/services/api';



const FilterTopBox= () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    keyword,
    location,
    destination,
    category,
    candidateGender,
    datePost,
    experiences,
    qualifications,
    sort,
    perPage,
  } = useSelector((state) => state.candidateFilter) || {};

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await get('employer/candidates');
        setCandidates(response.data.data.candidates);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch candidates');
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Filtering functions (similar to previous implementation)
  const keywordFilter = (item) =>
    keyword !== ""
      ? item?.name?.toLowerCase().includes(keyword?.toLowerCase()) && item
      : item;

  const locationFilter = (item) =>
    location !== ""
      ? item?.location?.toLowerCase().includes(location?.toLowerCase())
      : item;

  const categoryFilter = (item) =>
    category !== ""
      ? item?.employment?.some(emp => 
          emp.categories?.some((cat) => 
            cat.value.toLocaleLowerCase() === category?.toLocaleLowerCase()
          )
        )
      : item;

  const genderFilter = (item) =>
    candidateGender !== ""
      ? item?.candidateGender?.toLocaleLowerCase() ===
          candidateGender.toLocaleLowerCase() && item
      : item;

  const experienceFilter = (item) =>
    experiences?.length !== 0
      ? item?.employment?.some(emp => 
          experiences?.includes(
            emp.position?.split(" ").join("-").toLocaleLowerCase()
          )
        )
      : item;

  const sortFilter = (a, b) =>
    sort === "des" 
      ? (b.matchScore || 0) - (a.matchScore || 0)
      : (a.matchScore || 0) - (b.matchScore || 0);

  // Compute filtered and sorted content
  let content = candidates
    ?.slice(perPage.start, perPage.end === 0 ? 10 : perPage.end)
    ?.filter(keywordFilter)
    ?.filter(locationFilter)
    ?.filter(categoryFilter)
    ?.filter(genderFilter)
    ?.filter(experienceFilter)
    ?.sort(sortFilter)
    ?.map((candidate) => (
      <div className="candidate-block-three" key={candidate._id}>
        <div className="inner-box">
          <div className="content">
            <figure className="image">
              <img 
                src={candidate.avatar || '/default-avatar.png'} 
                alt={candidate.name} 
              />
            </figure>
            <h4 className="name">
              <Link to={`/candidates-single-v1/${candidate._id}`}>
                {candidate.name}
              </Link>
            </h4>

            <ul className="candidate-info">
              <li className="designation">{candidate.designation}</li>
              <li>
                <span className="icon flaticon-map-locator"></span>{" "}
                {candidate.location || 'N/A'}
              </li>
              <li>
                <span className="icon flaticon-money"></span> Match Score: 
                {candidate.matchScore?.toFixed(2) || 'N/A'}
              </li>
            </ul>

            <ul className="post-tags">
              {candidate.employment?.flatMap((emp) => 
                emp.categories?.map((cat, i) => (
                  <li key={i}>
                    <a href="#">{cat.value}</a>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="btn-box">
            <button className="bookmark-btn me-2">
              <span className="flaticon-bookmark"></span>
            </button>

            <Link
              to={`/candidates-single-v1/${candidate._id}`}
              className="theme-btn btn-style-three"
            >
              <span className="btn-title">View Profile</span>
            </Link>
          </div>
        </div>
      </div>
    ));

  // Sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // Per page handler
  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  // Clear handler
  const clearHandler = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addDestination({ min: 0, max: 100 }));
    dispatch(addCategory(""));
    dispatch(addCandidateGender(""));
    dispatch(addDatePost(""));
    dispatch(clearDatePost());
    dispatch(clearExperienceF());
    dispatch(clearExperience());
    dispatch(clearQualification());
    dispatch(clearQualificationF());
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  if (loading) return <div>Loading candidates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="show-1023">
            <button
              type="button"
              className="theme-btn toggle-filters"
              data-bs-toggle="offcanvas"
              data-bs-target="#filter-sidebar"
            >
              <span className="icon icon-filter"></span> Filter
            </button>
          </div>

          <div className="text">
            <strong>{content?.length}</strong> candidates
          </div>
        </div>

        <div className="sort-by">
          {/* Clear All button logic remains the same */}
          {(keyword !== "" ||
          location !== "" ||
          category !== "" ||
          candidateGender !== "" ||
          experiences?.length !== 0 ||
          sort !== "" ||
          perPage?.start !== 0 ||
          perPage?.end !== 0) && (
            <button
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
              onClick={clearHandler}
            >
              Clear All
            </button>
          )}

          <select
            onChange={sortHandler}
            className="chosen-single form-select"
            value={sort}
          >
            <option value="">Sort by (default)</option>
            <option value="asc">Best Match</option>
            <option value="des">Lowest Match</option>
          </select>

          <select
            className="chosen-single form-select ms-3"
            onChange={perPageHandler}
            value={JSON.stringify(perPage)}
          >
            <option value={JSON.stringify({ start: 0, end: 0 })}>
              All
            </option>
            <option value={JSON.stringify({ start: 0, end: 15 })}>
              15 per page
            </option>
            <option value={JSON.stringify({ start: 0, end: 20 })}>
              20 per page
            </option>
            <option value={JSON.stringify({ start: 0, end: 25 })}>
              25 per page
            </option>
          </select>
        </div>
      </div>

      {content}

      <ListingShowing />
    </>
  );
};

export default FilterTopBox;