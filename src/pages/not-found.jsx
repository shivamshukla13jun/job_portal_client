import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Page Not Found || Chem Pharma - Job Borad ReactJs Template",
  description: "Chem Pharma - Job Borad ReactJs Template",
};

const NotFoundPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div
        className="error-page-wrapper "
        style={{
          backgroundImage: `url(/images/404.jpg)`,
        }}
        data-aos="fade"
      >
        <div className="content">
          <div className="logo">
            <Link to="/">
              <img
                src="/images/logo.png"
                style={{ height: "50px" }}
                alt="brand"
              />
            </Link>
          </div>
          {/* End logo */}

          <h1>404!</h1>
          <p>The page you are looking for could not be found.</p>

          <Link className="theme-btn btn-style-three call-modal" to="/">
            BACK TO HOME
          </Link>
        </div>
        {/* End .content */}
      </div>
    </>
  );
};

export default NotFoundPage;
