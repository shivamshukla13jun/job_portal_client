const WidgetTopFilterBox = ({ data, job, setJob }) => {

  console.log(data)

  return (
    <div className="chosen-outer">
      <select
        className="chosen-single form-select chosen-container"
        defaultValue={job}
        onChange={e => setJob(e.target.value)}
      >
        <option hidden value={""}>Select Jobs</option>
        {
          data?.length > 0 &&
          data.map(it => (<option key={it._id} value={it._id}>{it.title}</option>))
        }
      </select>
      {/* <!--Tabs Box--> */}

      <select className="chosen-single form-select chosen-container">
        <option>All Status</option>
        <option>Last 12 Months</option>
        <option>Last 16 Months</option>
        <option>Last 24 Months</option>
        <option>Last 5 year</option>
      </select>
      {/* <!--Tabs Box--> */}
    </div>
  );
};

export default WidgetTopFilterBox;
