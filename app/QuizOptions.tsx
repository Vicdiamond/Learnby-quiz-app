"use client";

import { useEffect } from "react";
import LogoAndTitle from "./_components/LogoAndTitle";
import OptionContainer from "./_components/OptionContainer";
import { useAppFeatures } from "./_context/AppContext";
import { QuizType } from "./_data/types";

function QuizOptions() {
  const { state, dispatch } = useAppFeatures();
  const { mainQuizzes } = state;

  useEffect(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);

  return (
    <div className="lg:w-full lg:max-w-[564px] sm:max-w-[500px]">
      {mainQuizzes.map((quiz: QuizType) => (
        <OptionContainer
          key={quiz.title}
          actionType="pickSubject"
          payload={quiz}
        >
          <LogoAndTitle title={quiz.title} icon={quiz.icon} />
        </OptionContainer>
      ))}
    </div>
  );
}

export default QuizOptions;
