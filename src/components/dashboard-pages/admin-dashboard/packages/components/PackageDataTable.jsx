import { get, getById } from "@/services/api";
import { paths } from "@/services/paths";
import { dateFormatter } from "@/utils/dateformater";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const PackageDataTable = () => {
  const {data,isLoading,isError,error}=useQuery({
    queryKey:["plan"],
    queryFn: async () => {
        let res = (await get('admin/plan')).data.data;
        return res;
    }

  })
  
  
  if (isLoading) return <div>Loading...</div>

  return (
    <table className="default-table manage-job-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Job Post Limits</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
      {
        data?.map((item,index)=>(
          <tr>
          <td>{index+1}</td>
          <td className="package">
            <a href="#">{item?.name}</a>
          </td>
          <td className="total-jobs">{item?.jobPostLimit}</td>
      
          <td className="price text-capitalize">{item?.type}</td>
          <td className="price">{item?.price}</td>
          <td className="status">{item?.isActive?"Active":'In Active'}</td>
        </tr>
     
        ))
      }
      </tbody>
    </table>
  );
};

export default PackageDataTable;
