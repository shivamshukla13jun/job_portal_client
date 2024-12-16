import { Link } from "react-router-dom";
import jobFeatured from "../../data/job-featured";
import { paths } from "@/services/paths";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/services/api";
import { API_EMPLOYER_PATH } from "@/lib/config";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, selectWishlist, selectWishlistLoading } from "@/store/reducers/Whishlist";
import { JobCard } from "../common/jobcard";


const JobFeatured1 = () => {
  const userInfo=useUserInfo()
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const SavedJobs = useSelector(selectWishlist);
  const wishlistLoading = useSelector(selectWishlistLoading);
  const { data, isLoading } = useQuery({
    queryKey: ['job-6'],
    queryFn: async () => {
      let res = (await get('job?limit=6&sort=new')).data.data;
      return res;
    }
  });
  const handleWishist = async (id, operation) => {
    if (!userInfo._id) {
      toast.info('Please login as Candidate to Save Job.');
      return;
    }
    if (id && operation) {
      dispatch(addToWishlist({ id, operation }));
    }
  };
  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <>
      {data?.length > 0 && data.map((item) => (
        <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item._id}>
          <JobCard item={item}/>
        </div>
        // End job-block
      ))}
    </>
  );
};

export default JobFeatured1;
