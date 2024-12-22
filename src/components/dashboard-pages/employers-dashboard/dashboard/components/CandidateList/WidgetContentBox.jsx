import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get, getById } from "@/services/api";
import { API_CANDIDATE_PATH } from "@/lib/config";
import { paths } from "@/services/paths";
import { useNavigate } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/utils/hooks/usePagination";
import { addPage } from "@/features/filter/candidateFilterSlice";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const WidgetContentBox = () => {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const {
    qualification,
    keyword,
    limit,
    page,
    category,
    experience_from,
    experience_to,
  } = useSelector((state) => state.candidateFilter) || {};

  const buildQueryParams = () => {
    let params = { limit, page };

    if (qualification) params.qualification = qualification;
    if (keyword) params.keyword = keyword;
    if (category) params.category = category;
    if (experience_from) params.experience_from = experience_from;
    if (experience_to) params.experience_to = experience_to;

    return params;
  };

  const { data = [], isLoading } = useQuery({
    queryKey: [
      `dashboard/employer`,
      qualification,
      keyword,
      category,
      experience_from,
      experience_to,
      page,
      limit,
    ],
    queryFn: async () => {
      const queryParams = buildQueryParams();
      const queryString = new URLSearchParams(queryParams).toString();

      let res = (await get(`employer/candidates?${queryString}`)).data;

      return res;
    },
    enabled: !!userInfo?.userTypeValue?._id,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="row">
      {data?.data?.length > 0 ? (
        <>
          {data?.data?.map((candidate) => (
            <div className="col-lg-6 candidate-block-three" key={candidate._id}>
              <div className="inner-box">
                <div className="content">
                  <figure className="image">
                    <img
                      src={
                        API_CANDIDATE_PATH + candidate?.profile?.filename ||
                        "/images/resource/candidate.png"
                      }
                      alt={candidate.name}
                    />
                  </figure>
                  <h4 className="name">
                    <Link to={`${paths.publiccandidate}/${candidate._id}`}>
                      {candidate.name}
                    </Link>
                  </h4>

                  <ul className="candidate-info">
                    <li className="designation">{candidate.designation}</li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>{" "}
                      {candidate?.contact?.current_address?.city || "N/A"}
                    </li>
                    {/* <li>
                      <span className="icon flaticon-money"></span> Match Score:
                      {candidate.matchScore || "N/A"}
                    </li> */}
                  
                  </ul>

                  <ul className="post-tags">
                    {candidate.employment?.flatMap((emp) =>
                      emp.categories?.map((cat, i) => (
                        <li key={i}>
                          <a href="#">{cat.value}</a>
                        </li>
                      ))
                    )}
                  </ul>
                  <ul  className="post-tags">
                  <li>
                    <div style={{ width: 80, height: 80, margin: "0 auto" }}>

                  <CircularProgressbar
                     
                    value={candidate.matchScore || 0}
                    text={`${candidate.matchScore || 0}%`}

                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
                  
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'butt',
                  
                      // Text size
                      textSize: '16px',
                  
                      // How long animation takes to go from one candidate.matchScore || 0 to another, in seconds
                      pathTransitionDuration: 0.5,
                  
                      // Can specify path transition in more detail, or remove it entirely
                      // pathTransition: 'none',
                  
                      // Colors
                      pathColor: `rgba(62, 152, 199, ${candidate.matchScore || 0 / 100})`,
                      textColor: '#f88',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#3e98c7',
                    })}
                  />
                  </div>
                    </li>
                  </ul>
                 
                </div>
                 
                <div className="btn-box"></div>
               
              </div>
            </div>
          ))}
          {data?.totalPages && (
            <Pagination
              Page={page}
              limit={limit}
              totalPages={data?.totalPages || 0}
              handlePageChange={(page) => dispatch(addPage(page))}
            />
          )}
        </>
      ) : (
        <Container className="mt-4">
          <Alert variant="info" className="text-center">
            <Alert.Heading>No Candidates Found</Alert.Heading>
            <p>There are currently no candidates matching your posted jobs</p>
            <hr />
          </Alert>
        </Container>
      )}
    </div>
  );
};

export default WidgetContentBox;
