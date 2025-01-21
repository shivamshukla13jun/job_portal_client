import { Link } from "react-router-dom";
import candidatesData from "../../../../../data/candidates";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { API_CANDIDATE_PATH } from "@/lib/config";
import { useNavigate } from "react-router-dom";
import { put,get,getById } from "@/services/api";
import { toast } from "react-toastify";
import { paths } from "@/services/paths";
import { useAcceptApplication, useDeleteApplication } from "@/utils/hooks/useApplication";
import Pagination from "@/utils/hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";
import CandidateCard from "./CandidateCard";


const Applicants = ({data,isLoading}) => {

  const dispatch=useDispatch()
   const {
      qualification,
      keyword,
      limit,
      page,
      category,
      experience_from,
      experience_to,
    } = useSelector((state) => state.candidateFilter) || {};
 

 

  if (isLoading) return <div>Loading...</div>
  return (
    <>
         {data?.data.map((item) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={item?.candidate?._id}
                  >
                  <CandidateCard item={item}  />
                  </div>
                ))}
                 {data?.totalPages && (
            <Pagination
              Page={page}
              limit={limit}
              totalPages={data?.totalPages || 0}
              handlePageChange={(page) => dispatch(addPage(page))}
            />
          )}
    </>
  );
};

export default Applicants;
