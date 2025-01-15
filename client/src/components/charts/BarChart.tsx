import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
  { range: "0-100", count: 10 },
  { range: "101-200", count: 20 },
  { range: "201-300", count: 30 },
  { range: "301-400", count: 50 },
  { range: "401-500", count: 80 },
  { range: "501-600", count: 60 },
  { range: "601-700", count: 30 },
  { range: "701-800", count: 90 },
  { range: "801-900", count: 40 },
  { range: "901-above", count: 50 },
];

const BarChart = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3 style={{ textAlign: "center" }}>
        Bar Chart Stats - June <span style={{ fontSize: "0.8rem" }}>(Selected month name from dropdown)</span>
      </h3>
      <ResponsiveContainer>
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4cd7d0" barSize={40} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
