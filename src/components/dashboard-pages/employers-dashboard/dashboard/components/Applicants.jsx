import { Link } from "react-router-dom";
import candidatesData from "../../../../../data/candidates";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { API_CANDIDATE_PATH } from "@/lib/config";
import { useNavigate } from "react-router-dom";
import { put,get,getById } from "@/services/api";
import { toast } from "react-toastify";
import { paths } from "@/services/paths";


const Applicants = () => {
  const queryClient = useQueryClient();
  const userInfo=useUserInfo()
  const { data, isLoading } = useQuery({
    queryKey: [`application/tracking`,],
    queryFn: async () => {
      let res = (await get(`application/tracking`)).data;
      return res;
    },
    enabled: !!userInfo._id
  });

  const navigate = useNavigate();
  const acceptMutation = useMutation({
    mutationFn: ({_id,status}) => put('/application/status', _id, { status: status }),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        queryClient.invalidateQueries([`application/tracking`]);
      }
    },
    onError: (err) => {
      toast.error(err.response.data.error)
    }
  });
  const handleAccept = (_id,status) => {
    acceptMutation.mutate({_id,status});
  };

  
  return (
    <>
         {data?.data.map(({_id, candidate }) => (
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
                            ₹{candidate?.hourlyRate || '17000'}
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
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
    </>
  );
};

export default Applicants;
