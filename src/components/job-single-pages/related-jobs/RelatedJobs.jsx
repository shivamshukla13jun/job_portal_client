import { Link } from "react-router-dom";
import jobs from "../../../data/job-featured";
import { paths } from "@/services/paths";
import { API_EMPLOYER_PATH } from "@/lib/config";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { useSelector } from "react-redux";
import { selectWishlist } from "@/store/reducers/Whishlist";
import { JobCard } from "@/components/common/jobcard";

const RelatedJobs = ({ data,handleWishist }) => {
  const SavedJobs = useSelector(selectWishlist);
  return (
    <>
      {data.length > 0 && data.map((item) => (
        <div className="job-block" key={item._id}>
        <JobCard  item={item}/>
        </div>
        // End job-block
      ))}
    </>
  );
};

export default RelatedJobs;
