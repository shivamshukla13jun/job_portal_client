

import { Link } from "react-router-dom";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";

import { useLocation } from "react-router-dom";
import { logout } from "@/store/reducers/user";
import { del } from "@/services/api";
import { toast } from "react-toastify";
import { paths } from "@/services/paths";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { API_EMPLOYER_PATH } from "@/lib/config";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { useEffect, useState } from "react";

const DashboardEmployerSidebar = () => {

    const userInfo = useUserInfo()

    const { pathname } = useLocation();
    const { menu } = useSelector((state) => state.toggle);
    const [isMobile, setMobile] = useState(window.innerWidth <= 1023);

    const dispatch = useDispatch();
    // menu togggle handler
    const menuToggleHandler = async (item) => {
        dispatch(menuToggle());
        if (item.name === 'Logout') {
            let dialogoue=confirm("Are You Sure")
            if(dialogoue){
    
              dispatch(logout());
              sessionStorage.removeItem("session");
              sessionStorage.removeItem("userInfo");
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
                  window.location.href = paths.login;
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

            {isMobile && userInfo && userInfo?.userType?.name?.toLowerCase() === 'employer' && (
                <>
                    <div className="dropdown dashboard-option d-flex" style={{ padding: "10px 25px" }}>
                        <img
                            alt="avatar"
                            className="thumb"
                            src={userInfo?.userTypeValue?.logo?.filename ? API_EMPLOYER_PATH + userInfo?.userTypeValue?.logo?.filename : '/images/resource/company-6.png'}
                            style={{ objectFit: "contain" }}
                        />
                        <span className="name">{userInfo?.userTypeValue?.business_name ? capitalizeFirstLetter(userInfo?.userTypeValue?.business_name?.split(" ")[0]) : 'My account'}</span>
                    </div>
                    <hr style={{ margin: 0, background: "black" }} />
                </>
            )}

            <div className="sidebar-inner">
                <ul className="navigation">
                    {employerMenuData.map((item) => (
                        <li
                            className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                            key={item.id}
                            onClick={() => menuToggleHandler(item)}
                        >
                            <Link to={item.routePath}>
                                <i className={`la ${item.icon}`}></i>{" "}
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardEmployerSidebar;
