import SyllabusItem from "../_components/SyllabusItem";
import { syllabusData } from "../_data/data";

function SyllabusAnalysis() {
  return (
    <div className="border border-[#ebeff3]  px-6 py-5 rounded-xl mt-3 lg:mt-0 col-start-2 col-end-3 row-start-1 row-end-6 xl:h-auto xl:self-start">
      <h2 className="font-bold">Syllabus Wise Analysis</h2>

      <div className="mt-5">
        {syllabusData.map((data) => (
          <SyllabusItem
            key={data.title}
            colorName={data.colorName}
            colorValue={data.colorValue}
            title={data.title}
            percentage={data.percentage}
          />
        ))}
      </div>
    </div>
  );
}

export default SyllabusAnalysis;
