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
import { Badge } from "react-bootstrap";
import CandidateCard from "@/components/common/CandidateCard";


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
      {data?.map((item) => (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={item?._id}
        >
         <CandidateCard item={item}/>
        </div>
      ))}
    </div>
  </>
  );
};

export default Applicants;
