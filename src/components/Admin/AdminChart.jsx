
import { useState } from "react";
import { UserData } from "../../pages/Admin/FAKEDATA";
import BarChart from "../supplier/BarChart";
import PieChart from "./PieChart";

const AdminChart = () => {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Attendence",
            data: UserData.map((data) => data.userGain),
            backgroundColor: [
              "#303C6C",
              "#FA976C",
              "#B4DFE5",
              "#7FFFD4",
              
            ],
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      });
    
    
  return (
    <div className="chart">
 <div style={{ width: 500 }}>
   <PieChart chartData={userData}/>
   </div>

   
 </div>
  )
}

export default AdminChart