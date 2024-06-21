import { useEffect, useState } from "react";
import BarChart from "../supplier/BarChart";
import PieChart from "./PieChart";
import api from "../../axiosInterceptors";

const AdminChart = () => {
  const [data, setData] = useState([]);

  const [userData, setUserData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post('orders/Ordergraphs');
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      setUserData({
        labels: data?.map(item => item.year),
        datasets: [
          {
            label: "Orders",
            data: data?.map(item => item.userGain),
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
    }
  }, [data]);

  return (
    <div className="chart  flex justify-center items-center">
      <div style={{ width: 380 }}>
      <h2 className="text-center">Order Summary</h2>
        <PieChart chartData={userData} />
      </div>
    </div>
  );
};

export default AdminChart;
