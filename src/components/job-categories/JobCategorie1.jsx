import { Link } from "react-router-dom";
import jobCatContent from "../../data/job-catergories";
import { paths } from "@/services/paths";
import { categories } from "@/data/category";

const JobCategorie1 = () => {
  return (
    <>
      {categories.slice(0, 9).map((item, index) => {
        //console.log(index)
        return (
          <div
            className="category-block col-lg-4 col-md-6 col-sm-12"
            key={item.name + index}
          >
            <div className="inner-box">
              <div className="content">
                <span className={`icon ${jobCatContent[index].icon}`}></span>
                <h4>
                  <Link to={paths.job_list + "?categories=" + item.value}>{item.label}</Link>
                </h4>
                {/* <p>({item.jobNumber || 0} open positions)</p> */}
              </div>
            </div>
          </div>
        )
      })}
    </>
  );
};

export default JobCategorie1;
