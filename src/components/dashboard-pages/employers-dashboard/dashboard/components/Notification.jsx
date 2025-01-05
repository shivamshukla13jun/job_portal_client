const Notification = ({ data }) => {
  console.log({ data });
  return (
    <ul className="notification-list">
      {data?.data?.map(({ candidate, job, intrviewConfirmation }, index) => (
        <li key={index}>
          <span className="icon flaticon-briefcase"></span>
          <strong>{candidate?.name}</strong> applied for a job
          <span className="colored"> {job?.title}</span>
          {job?.interview_details?.intrviewConfirmation?.confirm  && (
            <div className="interview-details">
              <p>
                <strong>Interview:</strong> {job.interview_details.type} on{" "}
                <span className="colored">
                  {new Date(job.interview_details.date).toLocaleDateString()}{" "}
                  at {job.interview_details.time}
                </span>
              </p>
              {job.interview_details.type === "in_person" && (
                <p>
                  <strong>Location:</strong>{" "}
                  <span className="colored">
                    {job.interview_details.location}
                  </span>
                </p>
              )}
            </div>
          )}
          <p>
            <strong>Interview Confirmation:</strong>{" "}
            <span
              className={`${
                intrviewConfirmation?.confirm ? "confirmed" : "pending"
              }`}
            >
              {intrviewConfirmation?.confirm ? "Confirmed" : "Pending"}
            </span>
          </p>
          {intrviewConfirmation?.message && (
            <p>
              <strong>Message:</strong> {intrviewConfirmation.message}
            </p>
          )}
        </li>
      ))}
      {/* End li */}
    </ul>
  );
};

export default Notification;
