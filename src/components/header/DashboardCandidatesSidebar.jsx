import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import candidatesuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";

import { useLocation } from "react-router-dom";
import { logout } from "@/store/reducers/user";
import { del } from "@/services/api";
import { toast } from "react-toastify";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { API_CANDIDATE_PATH } from "@/lib/config";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { useEffect, useState } from "react";
import { paths } from "@/services/paths";

const DashboardCandidatesSidebar = () => {
  const userInfo = useUserInfo();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { menu } = useSelector((state) => state.toggle);
  const [isMobile, setMobile] = useState(window.innerWidth <= 1023);

  const percentage = 30;

  // menu togggle handler
  const menuToggleHandler = async (item) => {
    dispatch(menuToggle());
      if (item.name === 'Logout') {
        let dialogoue=confirm("Are You Sure")
        if(dialogoue){

          dispatch(logout());
          sessionStorage.removeItem("session");
          sessionStorage.removeItem("userInfo");
          window.location.href = paths.login;

        }
      }
      if (item.name === 'Delete Profile') {
        try {
          let dialogoue=confirm("Are You Sure")
          if(dialogoue){
            const res = await del('/user', userInfo._id);
            if (res.data.success) {
              toast.success(res.data.message);
              sessionStorage.removeItem("session");
              sessionStorage.removeItem("userInfo");
              window.location.href = "/";
            }
          }
        } catch (err) {
          toast.error(err.response.data.error)
        }
      }
    
  
  };

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 1023);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      {isMobile && userInfo && userInfo?.userType?.name?.toLowerCase() === 'candidate' && (
        <>
          <div className="dropdown dashboard-option d-flex" style={{ padding: "10px 25px" }}>
            <img
              alt="avatar"
              className="thumb"
              src={userInfo?.userTypeValue?.profile?.filename ? API_CANDIDATE_PATH + userInfo?.userTypeValue?.profile?.filename : '/images/resource/company-6.png'}
              style={{ objectFit: "contain" }}
            />
            <span className="name">{userInfo?.userTypeValue?.name ? capitalizeFirstLetter(userInfo?.userTypeValue?.name?.split(" ")[1]) : 'My account'}</span>
          </div>
          <hr style={{ margin: 0, background: "black" }} />
        </>
      )}


      <div className="sidebar-inner">
        <ul className="navigation">
          {candidatesuData.map((item) => (
            <li
              className={`${isActiveLink(item.routePath, pathname) ? "active" : ""
                } mb-1`}
              key={item.id}
              onClick={() => menuToggleHandler(item)}
            >
              {item.name==="Logout" || item.name==="Delete Profile"?
             <Link >
             <i className={`la ${item.icon}`}></i> {item.name}
           </Link>
              :<Link to={item.routePath}>
                <i className={`la ${item.icon}`}></i> {item.name}
              </Link> }
              
            </li>
          ))}
        </ul>
        {/* End navigation */}

        <div className="skills-percentage">
          <h4>Skills Percentage</h4>
          <p>
            `Put value for <strong>Cover Image</strong> field to increase your
            skill up to <strong>85%</strong>`
          </p>
          <div style={{ width: 200, height: 200, margin: "auto" }}>
            <CircularProgressbar
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#7367F0",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>{" "}
          {/* <!-- Pie Graph --> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
