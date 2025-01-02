import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/reducers/user";
import { del, getById } from "@/services/api";
import { toast } from "react-toastify";
import { paths } from "@/services/paths";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { isActiveLink } from "@/utils/linkActiveChecker";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import HeaderNavContent from "./HeaderNavContent";
// Helper to get user display name
const getDisplayName = () => {
  const userInfo = useUserInfo();
  const userType = userInfo?.userType?.name?.toLowerCase();
  if (!userInfo?.userTypeValue) return "My account";

  switch (userType) {
    case "employer":
    case "subemployer":
      return userInfo.userTypeValue.business_name
        ? capitalizeFirstLetter(userInfo.userTypeValue.business_name.split(" ")[0])
        : "My account";
    case "candidate":
      return userInfo.userTypeValue.name
        ? capitalizeFirstLetter(userInfo.userTypeValue.name.split(" ")[1])
        : "My account";
    default:
      return "My account";
  }
};
const DashboardHeader = () => {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(false);

  const userType = userInfo?.userType?.name?.toLowerCase();
  const userId = userInfo?._id;
  const userTypeById = userInfo?.userTypeValue?._id;

  // Handle menu toggle actions
  const menuToggleHandler = async (item) => {
    if (item.name === "Logout") {
      if (confirm("Are You Sure")) {
        dispatch(logout());
        sessionStorage.clear();
        window.location.href = paths.login;
      }
    }
    if (item.name === "Delete Profile") {
      try {
        if (confirm("Are You Sure")) {
          const res = await del("/user", userInfo._id);
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

  // Fetch menu items from the backend
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ["user/menu", userId],
    queryFn: async () => {
      try {
        const res = await getById("user/menu", userId);
        return res.data.data;
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    },
    enabled: Boolean(userId),
  });

  useEffect(() => {
    const changeBackground = () => {
      setNavbar(window.scrollY >= 0);
    };
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <header className={`main-header header-shaddow ${navbar ? "fixed-header" : ""}`}>
      <div className="container-fluid">
        <div className="main-box">
          <div className="nav-outer">
            <div className="logo-box">
              <Link to="/">
                <img alt="brand" src="/images/logo.png" style={{ height: "50px" }} />
              </Link>
            </div>
            <HeaderNavContent />
          </div>

          <div className="outer-box">
            {userInfo && (
              <div className="dropdown dashboard-option">
                <a className="dropdown-toggle" role="button" data-bs-toggle="dropdown">
                  <img
                    alt="avatar"
                    className="thumb"
                    src={
                      userInfo?.userTypeValue?.profile?.filename
                        ? `/api/path/${userInfo.userTypeValue.profile.filename}`
                        : "/images/resource/company-6.png"
                    }
                    style={{ objectFit: "contain" }}
                  />
                  <span className="name">{getDisplayName()}</span>
                </a>
                <ul className="dropdown-menu">
                  {Array.isArray(menuItems) &&
                    menuItems.map((item) => (
                      <li
                        key={item.id}
                        className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                        onClick={() => menuToggleHandler(item)}
                      >
                        <Link
                          to={`${
                            item.routePath +
                            (item.paramtype === "EmployerId" || item.paramtype === "SubEmployerId"
                              ? "/" + userTypeById
                              : "") +
                            (item.paramtype === "createdBy" && userId ? "/" + userId : "")
                          }`}
                        >
                          <i className={`la ${item.icon}`}></i> {item.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};



export default DashboardHeader;
