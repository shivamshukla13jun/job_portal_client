import Social from "../social/Social";

const CompanyInfo = ({ data }) => {
  return (
    <ul className="company-info">
      {/* <li>
        Primary industry: <div dangerouslySetInnerHTML={{__html:data?.employerId?.product_services}}></div>
      </li> */}
      <li>
        Company size: <span>{data?.company?.size_of_org}</span>
      </li>
      <li>
        Founded in: <span>{new Date(data?.employerId?.year_established).getFullYear()}</span>
      </li>
      <li>
        Phone: <span>{data?.company?.phone}</span>
      </li>
      <li>
        Email: <span>{data?.company?.email}</span>
      </li>
      <li>
        Location: <span>{data?.location}</span>
      </li>
      <li>
        Social media:
        <Social />
      </li>
    </ul>
  );
};

export default CompanyInfo;
