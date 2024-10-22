const JobSkills = ({ data }) => {
  return (
    <ul className="job-skills">
      {data?.skills?.length > 0 && data.skills.map((skill, i) => (
        <li key={i}>
          <a>{skill.label}</a>
        </li>
      ))}
    </ul>
  );
};

export default JobSkills;
