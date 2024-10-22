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
  isActiveLink,
  isActiveParentChaild,
  isActiveChild,
} from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
import { paths } from "@/services/paths";

const HeaderNavContent = (props) => {
  const { userInfo } = props;
  const { pathname } = useLocation();

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
            {/* End findjobs menu items */}

            {userInfo?.userType?.name?.toLowerCase() === 'employer' ? (
              <li className={`${isActiveParent(employerItems, pathname) ? "current" : ""}`} >
                <Link to={paths.employer}>Employers</Link>
              </li>
            ) : <></>}
            {/* End Employers menu items */}

            {userInfo?.userType?.name?.toLowerCase() === 'candidate' ? (
              <li className={`${isActiveParent(candidateItems, pathname) ? "current" : ""}`} >
                <Link to={paths.candidate}>Candidates</Link>
              </li>
            ) : <></>}
            {/* End Candidates menu items */}

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

            {/* <li className={`${isActiveParentChaild(pageItems, pathname) || isActiveParentChaild(shopItems[0].items, pathname) ? "current " : ""} dropdown`} >
              <span>Pages</span>
              <ul>
                {shopItems.map((item) => (
                  <li className="dropdown" key={item.id}>
                    <span
                      className={`${isActiveParentChaild(shopItems[0].items, pathname)
                        ? "current "
                        : ""
                        }`}
                    >
                      {item.title}
                    </span>
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, pathname)
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link to={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                {pageItems.map((item, i) => (
                  <li
                    className={
                      isActiveLink(item.routePath, pathname) ? "current" : ""
                    }
                    key={i}
                  >
                    <Link to={item.routePath}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* End Pages menu items */}
          </ul>
        )}
      </nav>
    </>
  );
};

export default HeaderNavContent;
