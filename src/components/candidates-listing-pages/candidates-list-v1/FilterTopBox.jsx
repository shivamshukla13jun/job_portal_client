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
import { API_CANDIDATE_PATH } from '@/lib/config';
import { paths } from '@/services/paths';
import { useNavigate } from 'react-router-dom';



const FilterTopBox= () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await get('employer/candidates');
        setCandidates(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch candidates');
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Compute filtered and sorted content
  let content = candidates?.map((candidate) => (
      <div className="candidate-block-three" key={candidate._id}>
        <div className="inner-box">
          <div className="content">
            <figure className="image">
              <img 
                src={API_CANDIDATE_PATH+ candidate?.profile?.filename || '/images/resource/candidate.png'} 
                alt={candidate.name} 
              />
            </figure>
            <h4 className="name">
              <Link to={`${paths.publiccandidate}/${candidate._id}`}>
                {candidate.name}
              </Link>

            </h4>

            <ul className="candidate-info">
              <li className="designation">{candidate.designation}</li>
              <li>
                <span className="icon flaticon-map-locator"></span>{" "}
                {candidate?.contact?.current_address?.city || 'N/A'}
              </li>
              <li>
                <span className="icon flaticon-money"></span> Match Score: 
                {candidate.matchScore || 'N/A'}
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
          </div>
        </div>
      </div>
    ));

 
 

  if (loading) return <div>Loading candidates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    
      {content}

    </>
  );
};

export default FilterTopBox;