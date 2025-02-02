"use client";

import PieChartComponent from "../_components/PieChartComponent";
import { useAppFeatures } from "../_context/AppContext";

function QuestionAnalysis() {
  const { userData } = useAppFeatures();
  return (
    <div className="border border-[#ebeff3]  px-6 py-5 rounded-xl mt-3 row-start-5 row-end-10 lg:mt-0 col-start-2 col-end-3 xl:h-auto xl:self-start">
      <div className="flex justify-between items-center">
        <h2 className="font-bold">Question Analysis</h2>
        <p className="text-[#3a7df4] font-bold">{userData.score}/15</p>
      </div>

      <p className="text-[#565a62] mt-2">
        <span className="font-bold">
          You scored {userData.score} questions correct out of 15.
        </span>
        {userData.score > 10
          ? " Very good job, keep it up"
          : " However it still needs some improvements"}
      </p>

      <PieChartComponent />
    </div>
  );
}

export default QuestionAnalysis;
