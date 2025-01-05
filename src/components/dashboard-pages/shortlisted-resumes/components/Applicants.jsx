
import { API_CANDIDATE_PATH } from "@/lib/config";
import { toast } from "react-toastify";
import MeetingSchadule from "./MeetingSchadule";
import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "@/services/paths";
import { useNavigate } from "react-router-dom";
import {  useDeleteApplication, useDeleteForwardcv } from "@/utils/hooks/useApplication";
import { Badge } from "react-bootstrap";

const Applicants = ({ data ,search}) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const navigate=useNavigate()
    const handleDelete = useDeleteForwardcv(search)
  const handleAccept = (id,subemployerid)=>{
    setCreateModalOpen(id)
  }
  const handleDownload = async (fileUrl,filename) => {
    try {
      //console.log("fileurl",fileUrl)
      // Fetch the file data
      const response = await fetch(fileUrl);
      const blob = await response.blob(); // Get the file as a Blob
  
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Create an object URL for the Blob
      link.download = filename; // Set the filename for download
  
      // Append the link to the body, trigger the click, then remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.info('Download failed');
    }
  };
  return (
    <>
    <div className="row">
      {data?.map(({_id,resume, candidateDetails,job,department }) => (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={candidateDetails?._id}
        >
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <img
                  src={API_CANDIDATE_PATH + candidateDetails?.profile?.filename}
                  alt="candidates"
                  onError={(e) => e.target.src = "/images/resource/candidate.png"}
                />
              </figure>
              <h4 className="name">
                <Link to={`${paths.publiccandidate}/${candidateDetails?._id}`}>
                  {candidateDetails?.name}
                </Link>
              </h4>
              <ul className="candidate-info">
                <li className="designation">
                  {candidateDetails?.designation || "Designation"}
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {candidateDetails?.contact?.current_address?.country}
                </li>
                <li>
                  <span className="icon flaticon-money"></span>
                  ₹{resume?.current_salary ||' '} LPA
                </li>
              </ul>

              <ul className="post-tags">
                {candidateDetails?.education?.map((val, i) => (
                  <li key={i}>
                    <a>{val.qualification}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="option-box">
              <ul className="option-list">
              <li>
                  <button data-text="View Application" onClick={() => navigate(`${paths.publiccandidate}/${candidateDetails._id}`)}>
                    <span className="la la-eye"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Download Cv" onClick={() => handleDownload(API_CANDIDATE_PATH + candidateDetails?.cv?.filename,candidateDetails?.cv?.originalname)}>
                    <span className="la la-download"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Create Meeting " onClick={() => handleAccept(_id)}>
                    <span className="la la-plus"></span>
                  </button>
                </li>
              
                <li>
                  <button data-text="Delete Application" onClick={() => handleDelete(_id)}>
                    <span className="la la-trash"></span>
                  </button>
                </li>
              </ul>

            </div>
            <br/>
              <Badge bg="success">By {department}</Badge>
          </div>
        </div>
      ))}
    </div>
                {createModalOpen && (
                    <MeetingSchadule 
                        isOpen={createModalOpen}
                        onClose={() => setCreateModalOpen(false)}
                    />
                )}
  </>
  );
};

export default Applicants;
