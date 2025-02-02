"use client";

import { useAppFeatures } from "../_context/AppContext";

function Stats() {
  const { userData } = useAppFeatures();

  return (
    <div className="border border-[#ebeff3]  px-2 py-4 rounded-xl mt-3">
      <h2 className="font-bold">Quick Statistics</h2>

      <div className="flex md:items-center items-start justify-between mt-3 md:divide-x md:divide-[#ebeff3] flex-col md:flex-row gap-4 sm:gap-10 md:gap-0">
        <div className="flex items-center gap-3 md:ml-7 md:pb-10 md:self-center md:pt-7">
          <p className="bg-[#f4f6f8] p-4 rounded-full text-textPreset1">🏆</p>
          <div className="self-end ">
            <p className="font-bold text-textPreset2">{userData.rank}</p>
            <p className="text-[#4f5761] mt-2 text-textPreset4">YOUR RANK</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:pl-7  md:pb-10 md:pt-7">
          <p className="bg-[#f4f6f8] p-4 rounded-full text-textPreset1">📝</p>
          <div className="self-end ">
            <p className="font-bold text-textPreset2">{userData.percentile}%</p>
            <p className="text-[#4f5761] mt-2 text-textPreset4">PERCENTILE</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:pl-7  md:pb-10 md:pt-7">
          <p className="bg-[#f4f6f8] p-4 rounded-full text-textPreset1">✅</p>
          <div className="self-end ">
            <p className="font-bold text-textPreset2">{userData.score}/15</p>
            <p className="text-[#4f5761] mt-2 text-textPreset4">
              CORRECT ANSWERS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
