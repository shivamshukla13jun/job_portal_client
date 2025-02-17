

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { datePost } from "@/utils/datePost";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },

    tooltips: {
      position: "nearest",
      mode: "index",
      intersect: false,
      yPadding: 10,
      xPadding: 10,
      caretSize: 4,
      // backgroundColor: "rgba(72, 241, 12, 1)",
      // borderColor: "rgb(255, 99, 132)",
      backgroundColor: "#1967d2",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 4,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset",
      data: labels.map(() => faker.number.int({ min: 100, max: 400 })),
      borderColor: "#1967d2",
      backgroundColor: "#1967d2",
      // data: [196, 132, 215, 362, 210, 252],
      fill: false,
    },
  ],
};

const ProfileChart = ({ data:dashboarddata}) => {
  //console.log("dashboarddata",dashboarddata)
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Your Profile Views</h4>
        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single">
     {
            datePost.map((item)=>(
              <option value={item.value}>{item.name}</option>
            ))
          }
          </select>
        </div>
      </div>
      {/* End widget top bar */}

      <div className="widget-content">
        <Line options={options} data={data} />
      </div>
      {/* End  profile chart */}
    </div>
  );
};

export default ProfileChart;
