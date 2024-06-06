
import { useState } from "react";
import { UserData } from "../../components/supplier/FAKEDATA";
import BarChart from "../../components/supplier/BarChart";

function   SupplyChart () {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Attendence",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "#333333",
          "#2283DC",
          
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });



  return (
    <div className="chart">
       <div style={{ width: 800 }}>
        <BarChart chartData={userData}/>
      </div>

      
    </div>
  );
}

export default SupplyChart;

