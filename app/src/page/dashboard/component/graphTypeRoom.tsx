import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./MostBookedRoomTypeChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const MostBookedRoomTypeChart = () => {
  const data = {
    labels: ["Standard Room", "Deluxe Room", "Suite Room", "Family Room"],
    datasets: [
      {
        label: "จำนวนการจอง",
        data: [45, 30, 15, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "ประเภทห้องที่ถูกจองมากที่สุด",
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
      {/* <div className="chart-info">
        <h3>📊 สรุปข้อมูล</h3>
        <p><b>ห้องที่ถูกจองมากสุด:</b> Standard Room (45%)</p>
        <p><b>ห้องที่ถูกจองน้อยสุด:</b> Family Room (10%)</p>
      </div> */}
    </div>
  );
};
