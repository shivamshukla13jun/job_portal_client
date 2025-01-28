

import { useDispatch, useSelector } from "react-redux";
import { addQualificationCheck } from "../../../features/candidate/candidateSlice";
import { addQualification } from "../../../features/filter/candidateFilterSlice";
import { useQuery } from "@tanstack/react-query";
import { get, getById } from "@/services/api";
import useUserInfo from "@/utils/hooks/useUserInfo";

const Qualification = () => {
    const { qualifications } = useSelector((state) => state.candidateFilter) || {};
    const dispatch = useDispatch();
    const userInfo=useUserInfo()
    // qualification handler
    const qualificationHandler = (e, id) => {
        dispatch(addQualificationCheck(id));
        dispatch(addQualification(e.target.value));
    };
    const { data=[], isLoading } = useQuery({
        queryKey: [`dashboard/options`],
        queryFn: async () => {
          let res = (await get(`utilities/applicationoptions/${userInfo?.userTypeValue?._id}/personal_info.info.degree`)).data.data
          return res;
        },
        enabled:!!userInfo?.userTypeValue?._id
      });
      if (isLoading) return <div>Loading...</div>;
      console.log(data)
    return (
        <ul className="switchbox">
            {data?.map((item) => (
                <li key={item.value}>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={Array.isArray(data) && data.map((item=>item.value)).includes(item)}
                            value={item}
                            onChange={(e) => qualificationHandler(e, item)}
                        />
                        <span className="slider round"></span>
                        <span className="title">{item.value}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default Qualification;
