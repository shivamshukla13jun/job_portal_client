import Categories from "./Categories";
import Experience from "./Experience";
import Qualification from "./Qualification";
import SearchBox from "./SearchBox";

const WidgetTopFilterBox = ({ data, job, setJob }) => {

  //console.log({data})

  return (
    <div className="chosen-outer">
      <SearchBox/>
      <Categories/>
      <Experience/>
      <Qualification/>
      </div>
  );
};

export default WidgetTopFilterBox;
