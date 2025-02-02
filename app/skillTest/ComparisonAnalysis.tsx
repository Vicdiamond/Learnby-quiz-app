"use client";
import LineChartComponent from "../_components/LineChartComponent";
import { useAppFeatures } from "../_context/AppContext";

function ComparisonAnalysis() {
  const { userData } = useAppFeatures();

  return (
    <div className="border border-[#ebeff3]  px-6 py-5 rounded-xl mt-3 col-start-1 col-end-2 row-start-4 row-end-10 xl:h-auto xl:self-start">
      <h2 className="font-bold">Comparison Graph</h2>

      <div>
        <div className="flex justify-between items-center">
          <p className="text-[#565a62]">
            <span className="font-bold">
              You scored {userData.percentile}% perentile
            </span>{" "}
            which is {+userData.percentile > 72 ? "higher" : "lower"} than the
            average percentile of 72% of all the engineers who took this
            assessment
          </p>

          <div className="bg-[#f4f6f8] p-4 rounded-full text-textPreset1">
            📈
          </div>
        </div>

        <div>
          <LineChartComponent />
        </div>
      </div>
    </div>
  );
}

export default ComparisonAnalysis;
