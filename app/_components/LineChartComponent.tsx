"use client";

import { useMemo, useState } from "react";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useAppFeatures } from "../_context/AppContext";

const data = [
  { percentile: 0, students: 5 },
  { percentile: 10, students: 8 },
  { percentile: 20, students: 12 },
  { percentile: 25, students: 15 },
  { percentile: 30, students: 15 },
  { percentile: 40, students: 18 },
  { percentile: 50, students: 10 },
  { percentile: 60, students: 5 },
  { percentile: 70, students: 8 },
  { percentile: 75, students: 10 },
  { percentile: 80, students: 6 },
  { percentile: 90, students: 4 },
  { percentile: 100, students: 2 },
];
function LineChartComponent() {
  const { userData } = useAppFeatures();

  const updatedData = useMemo(() => {
    const exists = data.some(
      (d) => d.percentile === Number(userData.percentile)
    );
    if (!exists) {
      return [...data, { percentile: userData.percentile, students: 1 }].sort(
        (a, b) => a.percentile - b.percentile
      );
    }
    return data;
  }, [userData.percentile]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={updatedData}>
        <XAxis
          dataKey="percentile"
          type="number"
          ticks={[0, 25, 50, 75, 100]}
          scale="linear"
          interval={0}
        />
        <Tooltip
          formatter={(value, name, props) => {
            return [`numberOfStudents: ${value} `];
          }}
        />
        <Line type="monotone" dataKey="students" stroke="#8884d8" />
        {userData.percentile !== undefined && (
          <ReferenceLine
            x={userData.percentile}
            stroke="#8884d8"
            label="Your percentile"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;
