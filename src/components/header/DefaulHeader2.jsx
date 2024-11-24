import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import candidatesMenuData from "@/data/candidatesMenuData";
import { isActiveLink } from "@/utils/linkActiveChecker";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { API_CANDIDATE_PATH, API_EMPLOYER_PATH } from "@/lib/config";
import employerMenu from "@/data/employerMenuData";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { useSelector } from "react-redux";
import { selectWishlist } from "@/store/reducers/Whishlist";
import { useNavigate } from "react-router-dom";
import SubemployerMenu from "@/data/SubemployerMenuData";

const DefaulHeader2 = () => {
  const userInfo = useUserInfo();
  const { pathname } = useLocation();
  const navigate=useNavigate()
  const SavedJobs = useSelector(selectWishlist);

  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${navbar ? "fixed-header animated slideInDown" : ""
        }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link to="/">
                <img
                  src="/images/logo.png"
                  style={{ height: "50px" }}
                  alt="brand"
                />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          {userInfo && <HeaderNavContent userInfo={userInfo} />}
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}
        <div className="outer-box">
          {/* <!-- Add Listing --> */}
          {Object.keys(userInfo).length <= 0 &&
            (<>
              {userInfo && userInfo?.userType?.name?.toLowerCase() === 'candidate' && (
                <Link to="/candidates-dashboard/cv-manager" className="upload-cv">
                  Upload your CV
                </Link>
              )}
              {/* <!-- Login/Register --> */}
              <div className="btn-box">
                <a
                  href="#"
                  className="theme-btn btn-style-three call-modal"
                  data-bs-toggle="modal"
                  data-bs-target="#loginPopupModal"
                >
                  Login / Register
                </a>
                {userInfo && userInfo?.userType?.name?.toLowerCase() === 'candidate' && (
                  <Link
                    to="/employers-dashboard/post-jobs"
                    className="theme-btn btn-style-one"
                  >
                    Job Post
                  </Link>
                )}

              </div>
            </>)
          }

          {userInfo?.userType?.name && (
            <div className="outer-box">
            
              {/* <!-- Dashboard Option --> */}
              {userInfo && userInfo?.userType?.name?.toLowerCase() === 'candidate' && (
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
                      src={API_CANDIDATE_PATH + userInfo?.userTypeValue?.profile?.filename}
                      style={{ objectFit: "contain" }}
                    />
                    <span className="name">{userInfo?.userTypeValue?.name ? capitalizeFirstLetter(userInfo?.userTypeValue?.name?.split(" ")[1]) : 'My account'}</span>
                  </a>

                  <ul className="dropdown-menu">
                    {candidatesMenuData.map((item) => (
                      <li
                        className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                        key={item.id}
                      >
                        <Link to={item.routePath}>
                          <i className={`la ${item.icon}`}></i> {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
                      src={API_EMPLOYER_PATH + userInfo?.userTypeValue?.logo?.filename}
                      style={{ objectFit: "contain" }}
                    />
                    <span className="name">{userInfo?.userTypeValue?.business_name ? capitalizeFirstLetter(userInfo?.userTypeValue?.business_name?.split(" ")[0]) : 'My account'}</span>
                  </a>

                  <ul className="dropdown-menu">
                    {employerMenu.map((item) => (
                      <li
                        className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                        key={item.id}
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
                      src={API_EMPLOYER_PATH + userInfo?.userTypeValue?.logo?.filename}
                      style={{ objectFit: "contain" }}
                    />
                    <span className="name">{userInfo?.userTypeValue?.business_name ? capitalizeFirstLetter(userInfo?.userTypeValue?.business_name?.split(" ")[0]) : 'My account'}</span>
                  </a>

                  <ul className="dropdown-menu">
                    {SubemployerMenu.map((item) => (
                      <li
                        className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                        key={item.id}
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
          )}
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
