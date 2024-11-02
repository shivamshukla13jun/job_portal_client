import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useDispatch } from "react-redux";
import { logout } from "@/store/reducers/user";
import { del } from "@/services/api";
import { toast } from "react-toastify";
import { paths } from "@/services/paths";
import { API_EMPLOYER_PATH } from "@/lib/config";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const DashboardHeader = () => {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

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
            {/* <button className="menu-btn">
              <span className="count">1</span>
              <span className="icon la la-heart-o"></span>
            </button> */}
            {/* wishlisted menu */}

            <button className="menu-btn">
              <span className="icon la la-bell"></span>
            </button>
            {/* End notification-icon */}

            {/* <!-- Dashboard Option --> */}
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
            {/* End dropdown */}
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
