import { API_CANDIDATE_PATH } from "@/lib/config";
import { toast } from "react-toastify";
import MeetingSchadule from "./MeetingSchadule";
import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "@/services/paths";
import { useNavigate } from "react-router-dom";
import { useAcceptApplication, useDeleteApplication } from "@/utils/hooks/useApplication";
import { Badge } from "react-bootstrap";
import CandidateCard from "@/components/common/CandidateCard";

const Applicants = ({ data, search }) => {
  return (
    <>
      <div className="row">
        {data?.map((item) => (
           <div
           className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
           key={item?._id}
       >
          <CandidateCard item={item} search={search}/>
          </div>
        ))}
      </div>
     
    </>
  );
};

export default Applicants;
