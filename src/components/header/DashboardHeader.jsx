import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";

import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/reducers/user";
import { del } from "@/services/api";
import { toast } from "react-toastify";
import { paths } from "@/services/paths";
import { API_CANDIDATE_PATH, API_EMPLOYER_PATH } from "@/lib/config";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { selectWishlist } from "@/store/reducers/Whishlist";
import candidateMenus from "@/data/candidatesMenuData";
import SubemployerMenu from "@/data/SubemployerMenuData";

const DashboardHeader = () => {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const SavedJobs = useSelector(selectWishlist);
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  // menu togggle handler
  const menuToggleHandler = async (item) => {
    if (item.name === 'Logout') {
      dispatch(logout());
      sessionStorage.removeItem("session");
      sessionStorage.removeItem("userInfo");
    }
    if (item.name === 'Delete Profile') {
      try {
        const res = await del('/user', userInfo._id);
        if (res.data.success) {
          toast.success(res.data.message);
          sessionStorage.removeItem("session");
          sessionStorage.removeItem("userInfo");
          window.location.href = paths.login;
        }
      } catch (err) {
        //console.log(err)
        toast.error(err.response.data.error)
      }

    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img
                    alt="brand"
                    src="/images/logo.png"
                    style={{ height: "50px" }}
                  />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">

            {/* <!-- Dashboard Option --> */}
            {/* Candidate  */}
            {userInfo && userInfo?.userType?.name?.toLowerCase() === 'candidate' && (
             <>
               <button onClick={()=>navigate("/candidates-dashboard/saved-jobs")} className="menu-btn">
                <Link to={"/candidates-dashboard/saved-jobs"} className="count">{SavedJobs?.length}</Link>
                <span className="icon la la-heart-o"></span>
              </button>
             <div className="dropdown dashboard-option">
                <a
                  className="dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    alt="avatar"
                    className="thumb"
                    src={userInfo?.userTypeValue?.profile?.filename ? API_CANDIDATE_PATH + userInfo?.userTypeValue?.profile?.filename : '/images/resource/company-6.png'}
                    style={{ objectFit: "contain" }}
                  />
                  <span className="name">{userInfo?.userTypeValue?.name ? capitalizeFirstLetter(userInfo?.userTypeValue?.name?.split(" ")[1]) : 'My account'}</span>
                </a>

                <ul className="dropdown-menu">
                  {candidateMenus.map((item) => (
                    <li
                      className={`${isActiveLink(item.routePath, pathname) ? "active" : ""
                        } mb-1`}
                      key={item.id}
                      onClick={() => menuToggleHandler(item)}
                    >
                      <Link to={item.routePath}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
             </>
            )}
            {/* Employer  */}
            {userInfo && userInfo?.userType?.name?.toLowerCase() === 'employer' && (
              <div className="dropdown dashboard-option">
                <a
                  className="dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    alt="avatar"
                    className="thumb"
                    src={userInfo?.userTypeValue?.logo?.filename ? API_EMPLOYER_PATH + userInfo?.userTypeValue?.logo?.filename : '/images/resource/company-6.png'}
                    style={{ objectFit: "contain" }}
                  />
                  <span className="name">{userInfo?.userTypeValue?.business_name ? capitalizeFirstLetter(userInfo?.userTypeValue?.business_name?.split(" ")[0]) : 'My account'}</span>
                </a>

                <ul className="dropdown-menu">
                  {employerMenuData.map((item) => (
                    <li
                      className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                      key={item.id}
                      onClick={() => menuToggleHandler(item)}
                    >
                      <Link to={item.routePath}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {userInfo && userInfo?.userType?.name?.toLowerCase() === 'subemployer' && (
              <div className="dropdown dashboard-option">
                <a
                  className="dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    alt="avatar"
                    className="thumb"
                    src={userInfo?.userTypeValue?.logo?.filename ? API_EMPLOYER_PATH + userInfo?.userTypeValue?.logo?.filename : '/images/resource/company-6.png'}
                    style={{ objectFit: "contain" }}
                  />
                  <span className="name">{userInfo?.userTypeValue?.name ? capitalizeFirstLetter(userInfo?.userTypeValue?.name) : 'My account'}</span>
                </a>

                <ul className="dropdown-menu">
                  {SubemployerMenu.map((item) => (
                    <li
                      className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                      key={item.id}
                      onClick={() => menuToggleHandler(item)}
                    >
                      <Link to={item.routePath}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* End dropdown */}
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
