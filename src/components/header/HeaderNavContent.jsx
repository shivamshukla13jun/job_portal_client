import { Link } from "react-router-dom";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
import { paths } from "@/services/paths";
import { fetchWishlist } from "@/store/reducers/Whishlist";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useUserInfo from "@/utils/hooks/useUserInfo";

const HeaderNavContent = () => {
  const  userInfo  = useUserInfo();
  const { pathname } = useLocation();
  const dispatch=useDispatch()
  useEffect(() => {
    if (userInfo?._id) {
      dispatch(fetchWishlist());
    }
  }, [userInfo?._id])
  return (
    <>
      <nav className="nav main-menu">
        
        {userInfo && (
          <ul className="navigation" id="navbar">
            <li className={`${isActiveParent(homeItems, pathname) ? "current" : ""}`}>
              <Link to={paths.home}>Home</Link>
            </li>
            {/* End homepage menu items */}

            <li className={`${isActiveParent(findJobItems, pathname) ? "current" : ""}`}>
              <Link to={paths.job_list}>Find Jobs</Link>
            </li>

            <li className={`${isActiveParentChaild(blogItems, pathname) ? "current" : ""}`} >
              <Link to={paths.blog}>Blog</Link>
            </li>
            {/* End Blog menu items */}

            <li className={`${pathname === paths.about ? "current" : ""}`}>
              <Link to={paths.about}>About Us</Link>
            </li>

            <li className={`${pathname === paths.contact ? "current" : ""}`}>
              <Link to={paths.contact}>Contact Us</Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default HeaderNavContent;
