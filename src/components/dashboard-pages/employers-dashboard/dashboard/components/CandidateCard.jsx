import { API_CANDIDATE_PATH } from '@/lib/config'
import { paths } from '@/services/paths'
import { useAcceptApplication, useDeleteApplication } from '@/utils/hooks/useApplication'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const CandidateCard = ({item}) => {
      const handleAccept = useAcceptApplication()
      const handleDelete = useDeleteApplication()
      
  const navigate = useNavigate();
  return (
    <div className="inner-box">
    <div className="content">
      <figure className="image">
        <img
          src={API_CANDIDATE_PATH + item?.candidate?.profile?.filename}
          alt="candidates"
          onError={(e) => e.target.src = "/images/resource/candidate.png"}

        />
      </figure>
      <h4 className="name">
        <Link to={`${paths.publiccandidate}/${item._id}`}>
          {item?.candidate?.name}
        </Link>
      </h4>
      <div className="designation d-flex align-items-center">
        <Link
          to={`${paths.job}/${item?.job?._id}`}
          className="d-flex align-items-center text-decoration-none"
        >
          <span
            className="la la-briefcase me-2"
            style={{ fontSize: "1.2rem", color: "#6c757d" }}
          ></span>
          <span className="fw-semibold text-dark">{item?.job?.title}</span>
        </Link>
      </div>
      <ul className="candidate-info">
        <li className="designation">
          {item?.candidate?.designation || "Designation"}
        </li>
        <li>
          <span className="icon flaticon-map-locator"></span>{" "}
          {item?.candidate?.contact?.current_address?.country}
        </li>
        <li>
          <span className="icon flaticon-money"></span>
          ₹{item?.candidate?.currentsalary } LPA
        </li>
      </ul>

      <ul className="post-tags">
        {item?.candidate?.education?.slice(0,1).map((val, i) => (
          <li key={i}>
            <a>{val.qualification}</a>
          </li>
        ))}
      </ul>
    </div>

    <div className="option-box">
      <ul className="option-list">
        <li>
          <button data-text="View Application" onClick={() => navigate(`${paths.publiccandidate}/${item._id}`)}>
            <span className="la la-eye"></span>
          </button>
        </li>
        <li>
          <button data-text="Approve Application" onClick={() => handleAccept(item._id,'shortlisted')}>
            <span className="la la-check"></span>
          </button>
        </li>
        <li>
          <button data-text="Reject Application" onClick={() => handleAccept(item._id,"rejected")}>
            <span className="la la-times-circle"></span>
          </button>
        </li>
        <li>
        <button data-text="Delete Application" onClick={() => handleDelete(item._id,job._id)}>
          <span className="la la-trash"></span>
        </button>
      </li>
      </ul>
    </div>
  </div>
  )
}

export default CandidateCard