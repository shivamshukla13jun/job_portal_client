import { get } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Pricing = () => {
const {data=[],isLoading}=useQuery({
  queryKey:["plans"],
  queryFn: async () => {
    try {
      let res = (await get('/plan')).data.data;
      return res;
    } catch (error) {
      console.log(error)
     return
    }
  },
})
console.log("dt????/",data)
  return (
    <div className="pricing-tabs tabs-box wow fadeInUp">
      {/* <!--Tabs Container--> */}
      <div className="row">
        {pricingCotent.map((item) => (
          <div
            className={`pricing-table col-lg-4 col-md-6 col-sm-12 ${item.tag}`}
            key={item.id}
          >
            <div className="inner-box">
              {item.tag ? (
                <>
                  <span className="tag">Recommended</span>
                </>
              ) : (
                ""
              )}

              <div className="title">{item.packageType}</div>
              <div className="price">
                ${item.price} <span className="duration">/ monthly</span>
              </div>
              <div className="table-content">
                <ul>
                  {item.features.map((feature, i) => (
                    <li key={i}>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="table-footer">
                <Link to="/shop/cart" className="theme-btn btn-style-three">
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
