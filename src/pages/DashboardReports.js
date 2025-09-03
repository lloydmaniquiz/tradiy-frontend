import React from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "../styles/DashboardReports.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardReports() {
  // Monthly Revenue (Line Chart)
  const revenueData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Revenue",
        data: [500, 1000, 700, 2300],
        fill: true,
        backgroundColor: "rgba(0, 200, 200, 0.2)",
        borderColor: "rgba(0, 200, 200, 1)",
        tension: 0.4,
      },
    ],
  };

  // Projects Success Rate (Line Chart)
  const successRateData = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [
      {
        label: "2024",
        data: [0, 10, 30, 40, 35, 50, 45, 70, 60, 80, 50, 40],
        borderColor: "#fbbf24",
        backgroundColor: "#fbbf24",
        fill: false,
        tension: 0.4,
      },
      {
        label: "2025",
        data: [30, 40, 50, 55, 45, 50, 42, 44, 0, 0, 0, 0],
        borderColor: "#06b6d4",
        backgroundColor: "#06b6d4",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  // Quote Acceptance Rate (Doughnut)
  const quoteData = {
    labels: ["Accepted", "Rejected"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#06b6d4", "#fbbf24"],
        hoverOffset: 4,
      },
    ],
  };

  // High-Demand Areas (Bar Chart)
  const demandData = {
    labels: [
      "Area 1",
      "Area 2",
      "Area 3",
      "Area 4",
      "Area 5",
      "Area 6",
      "Area 7",
      "Area 8",
      "Area 9",
      "Area 10",
    ],
    datasets: [
      {
        label: "Demand",
        data: [600, 550, 500, 450, 300, 200, 120, 80, 60, 40],
        backgroundColor: "#06b6d4",
      },
    ],
  };

  return (
    <div className="db-reports">
      {/* Top Cards */}
      <div className="db-reports-cards">
        <div className="db-card">
          <h2>Jobs</h2>
          <p className="db-card-number">123</p>
        </div>
        <div className="db-card">
          <h2>Customers</h2>
          <p className="db-card-number">123</p>
        </div>
        <div className="db-card">
          <h2>Bookmarks</h2>
          <p className="db-card-number">123</p>
        </div>
      </div>

      {/* Revenue */}
      <div className="db-chart-card">
        <h3>Monthly Revenue</h3>
        <h2>£12,345</h2>
        <Line data={revenueData} />
      </div>

      {/* Success + Quotes */}
      <div className="db-reports-row">
        <div className="db-chart-card">
          <h3>Projects Success Rate</h3>
          <Line data={successRateData} />
        </div>
        <div className="db-chart-card">
          <h3>Average Quote Acceptance Rate</h3>
          <Doughnut data={quoteData} />
        </div>
      </div>

      {/* High Demand Areas */}
      <div className="db-chart-card">
        <h3>High-Demand Areas</h3>
        <Bar data={demandData} />
      </div>
    </div>
  );
}
