import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { logout } from "@/store/reducers/user";
import { del, get, getById } from "@/services/api"; // Ensure `get` is from your Axios instance
import { toast } from "react-toastify";
import { paths } from "@/services/paths";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { menuToggle } from '@/features/toggle/toggleSlice';
import { isActiveLink } from '@/utils/linkActiveChecker';
import LoginPopup from '../common/form/login/LoginPopup';
import MobileMenu from './MobileMenu';
import DashboardHeader from './DashboardHeader';
import { useQuery } from '@tanstack/react-query';
import { API_CANDIDATE_PATH } from '@/lib/config';
import { getDisplayName } from '@/utils/getDisplayName';

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const [isMobile, setMobile] = useState(window.innerWidth <= 1023);
  const userTypeById = userInfo?.userTypeValue?._id;
  const userId = userInfo?._id
  // Fetch Menu from Backend



  const menuToggleHandler = async (item) => {
    dispatch(menuToggle());
    if (item.name === 'Logout') {
      if (confirm("Are You Sure")) {
        dispatch(logout());
        sessionStorage.clear();
        window.location.href = paths.home;
      }
    }
    if (item.name === 'Delete Profile') {
      try {
        if (confirm("Are You Sure")) {
          const res = await del('/user', userInfo._id);
          if (res.data.success) {
            toast.success(res.data.message);
            sessionStorage.clear();
            window.location.href = "/";
          }
        }
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 1023);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch sub-employers
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ["user/menu", userInfo?._id],
    queryFn: async () => {
      try {
        const res = await getById("user/menu", userInfo?._id);
        return res.data.data;
      } catch (error) {
        console.log("error", error)
      }
    },
    enabled: Boolean(userInfo?._id), // Check if userInfo and ID exist
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <LoginPopup />
      <DashboardHeader />
      <MobileMenu />
      {
        Object.keys(userInfo).length > 0 && <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
          <div className="pro-header text-end pb-0 mb-0 show-1023">
            <div className="fix-icon" onClick={menuToggleHandler}>
              <span className="flaticon-close"></span>
            </div>
          </div>

          {isMobile && userInfo && (
            <div className="dropdown dashboard-option d-flex" style={{ padding: "10px 25px" }}>
              <img alt="avatar" className="thumb"
                onError={(e) => e.target.src = "/images/resource/candidate.png"}
                src={`${API_CANDIDATE_PATH}${userInfo?.userTypeValue?.profile?.filename}`} style={{ objectFit: "contain" }} />
              <span className="name">{getDisplayName(userInfo)}</span>
            </div>
          )}

          <div className="sidebar-inner">
            <ul className="navigation">
              {Array.isArray(menuItems) && menuItems.map((item) => {
                let routePath = item.paramtype === 'EmployerId' || item.paramtype === 'SubEmployerId' ? item.routePath + '/' + userTypeById : item.paramtype === 'createdBy' && userId ? item.routePath + '/' + userId : item.routePath;
                return <li
                  className={`${isActiveLink(routePath, pathname) ? "active" : ""} mb-1`}
                  key={item.id}
                  onClick={() => menuToggleHandler(item)}
                >
                  <Link to={routePath}>
                    <i className={`la ${item.icon}`}></i>{" "}
                    {item.name}
                  </Link>
                </li>
              })}
            </ul>
          </div>
        </div>
      }
    </>
  );
};

export default DashboardSidebar;
