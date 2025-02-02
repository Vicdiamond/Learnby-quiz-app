import ComparisonAnalysis from "./ComparisonAnalysis";
import LanguageAndStats from "./LanguageAndStats";
import QuestionAnalysis from "./QuestionAnalysis";

import SyllabusAnalysis from "./SyllabusAnalysis";

function page() {
  return (
    <div className="px-6 md:px-10 py-6 md:py-8 order-1 xl:order-2 ">
      <h5 className="text-[#596065]">Skill Test</h5>

      <div className="lg:grid lg:grid-cols-[59%_41%] lg:grid-rows-7 lg:gap-4">
        <LanguageAndStats />
        <SyllabusAnalysis />
        <ComparisonAnalysis />
        <QuestionAnalysis />
      </div>
    </div>
  );
}

export default page;
