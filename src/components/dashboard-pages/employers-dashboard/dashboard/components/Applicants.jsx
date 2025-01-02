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


const Applicants = () => {
  const userInfo=useUserInfo()
  const handleAccept = useAcceptApplication()
  const handleDelete = useDeleteApplication()
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
  const { data, isLoading } = useQuery({
    queryKey: [`application/tracking`,page],
    queryFn: async () => {
      let res = (await get(`application/tracking?page=${page}&limit=${limit}`)).data;
      return res;
    },
    enabled: !!userInfo._id
  });

  const navigate = useNavigate();
 

  if (isLoading) return <div>Loading...</div>
  return (
    <>
         {data?.data.map(({_id, resume,candidate,job }) => (
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
                            onError={(e) => e.target.src = "/images/resource/candidate.png"}

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
                            ₹{candidate?.currentsalary } LPA
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
