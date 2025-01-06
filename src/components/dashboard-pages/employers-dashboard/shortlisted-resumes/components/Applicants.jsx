import { Link } from "react-router-dom";
import candidatesData from "../../../../../data/candidates";
import { paths } from "@/services/paths";
import { API_CANDIDATE_PATH } from "@/lib/config";
import { useNavigate } from "react-router-dom";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { del, get, put } from "@/services/api";
import { toast } from "react-toastify";
import { useAcceptApplication, useDeleteApplication } from "@/utils/hooks/useApplication";
import { useSelector } from "react-redux";


const Applicants = ({ data}) => {
  const navigate=useNavigate()
    const filters= useSelector((state) => state.candidateFilter) || {};
  const handleAccept = useAcceptApplication()
  const handleDelete = useDeleteApplication(filters)
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
      {data?.map(({_id,resume, candidate,job }) => (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={candidate?._id}
        >
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <img
                  src={API_CANDIDATE_PATH + candidate?.profile?.filename}
                  alt="candidates"
                />
              </figure>
              <h4 className="name">
                <Link to={`${paths.publiccandidate}/${candidate?._id}`}>
                  {candidate?.name}
                </Link>
              </h4>
              <ul className="candidate-info">
                <li className="designation">
                  {candidate?.designation || "Designation"}
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {candidate?.contact?.current_address?.country}
                </li>
                <li>
                  <span className="icon flaticon-money"></span>
                  ₹{resume?.current_salary ||' '} LPA
                </li>
              </ul>

              <ul className="post-tags">
                {candidate?.education?.map((val, i) => (
                  <li key={i}>
                    <a>{val.qualification}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="option-box">
              <ul className="option-list">
                <li>
                  <button data-text="View Application" onClick={() => navigate(`${paths.publiccandidate}/${candidate._id}`)}>
                    <span className="la la-eye"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Approve Application" onClick={() => handleAccept(_id,'shortlisted')}>
                    <span className="la la-check"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Download Cv" onClick={() => handleDownload(API_CANDIDATE_PATH + candidate?.cv?.filename,candidate?.cv?.originalname)}>
                    <span className="la la-download"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Reject Application" onClick={() => handleAccept(_id,"rejected")}>
                    <span className="la la-times-circle"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Delete Application" onClick={() => handleDelete(_id,job._id)}>
                    <span className="la la-trash"></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default Applicants;
