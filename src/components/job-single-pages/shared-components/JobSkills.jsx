const JobSkills = ({ data }) => {
  const skills = [
    "app",
    "administrative",
    "android",
    "wordpress",
    "design",
    "react",
  ];
  return (
    <ul className="job-skills">
      {data?.candidate_requirement?.skills.map((skill, i) => (
        <li key={i}>
          <a >{skill.label}</a>
        </li>
      ))}
    </ul>
  );
};

export default JobSkills;
