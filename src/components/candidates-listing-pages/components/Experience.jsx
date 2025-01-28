import { addExperience } from "@/features/filter/candidateFilterSlice";
import { get } from "@/services/api";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";

const Experience = () => {
    const userInfo=useUserInfo()
const dispath=useDispatch()
const candidateFilter=useSelector((state)=>state.candidateFilter)

    const handleOnChange = (value) => {
       dispath(addExperience({experience_from: value.min, experience_to: value.max}))     
    }

    const { data=[], isLoading } = useQuery({
        queryKey: [`dashboard/options`],
        queryFn: async () => {
          let res = (await get(`utilities/applicationoptions/${userInfo?.userTypeValue?._id}/education.qualification`)).data.data
          return res;
        },
        enabled:!!userInfo?.userTypeValue?._id
      });
      console.log(data)
    return (
        <div className="range-slider-one salary-range">
            <InputRange
                formatLabel={(value) => ``}
                minValue={0}
                maxValue={10}
                value={{
                    min: candidateFilter.experience_from,
                    max: candidateFilter.experience_to,
                }}
                onChange={(value) => handleOnChange(value)}
            />
            <div className="input-outer">
                <div className="amount-outer">
                    <span className="d-inline-flex align-items-center">
                        <span className="min">{candidateFilter.experience_from} year</span>
                        <span className="max ms-2">{candidateFilter.experience_to} year</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Experience;
