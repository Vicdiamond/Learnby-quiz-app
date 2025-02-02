"use client";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useAppFeatures } from "../_context/AppContext";

function PieChartComponent() {
  const { userData } = useAppFeatures();
  const total = 15;
  const value = +userData.score;

  const data = [
    { name: "Actual", value: value },
    { name: "Remaining", value: total - value },
  ];

  const COLORS = ["#3a7df4", "#eaf2fe"];
  return (
    <ResponsiveContainer width="100%" height={200} className="xl:h-[150px]">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={50}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}

          <Label
            value="🎯"
            position="center"
            style={{ fontSize: "40px", fontWeight: "bold" }}
          />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartComponent;
