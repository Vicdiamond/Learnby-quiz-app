// import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppFeatures } from "@/app/_context/AppContext";
import Image from "next/image";

import Options from "@/app/_components/Options";
import ErrorIcon from "@/public/assets/images/icon-error.svg";
import Button from "@/app/_components/Button";

function McqFormat() {
  const { state, dispatch } = useAppFeatures();
  const { subjectPicked, clickedOption, error } = state;

  const [questionNumber, setQuestionNuber] = useState("1");
  const [hasAnswered, setHasAnswered] = useState(false);
  const router = useRouter();

  // Needed to fix hydration error
  useEffect(() => {
    if (typeof window !== "undefined") {
      setQuestionNuber((prev) => localStorage.getItem("question") || prev);
      setHasAnswered(localStorage.getItem("hasAnswered") === "true" || false);
    }
  }, []);

  const currentQuestion = subjectPicked?.questions[+questionNumber - 1];
  const numOfQuestions = subjectPicked?.questions.length;

  function handleSubmit() {
    if (clickedOption === "") return dispatch({ type: "checkClickedOption" });
    dispatch({ type: "submitAnswer", payload: clickedOption });
    setHasAnswered(true);
  }
  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
    if (+questionNumber < 10) {
      localStorage.setItem("question", `${+questionNumber + 1}`);
      setQuestionNuber(`${+questionNumber + 1}`);
    }
    setHasAnswered(false);
  }
  function handleFinish() {
    router.push("/quiz/finish");
  }
  return (
    <div className="p-5 mb-12 w-full sm:p-10 lg:flex lg:items-start lg:justify-between lg:px-[5rem] z-10 relative gap-2">
      <div className="lg:flex lg:flex-col lg:items-center lg:justify-between lg:gap-28">
        <div>
          <p className="italic-font text-sm dark:text-[#ABC1E1] text-[#4c4f55]">
            Question {questionNumber} of {numOfQuestions}
          </p>
          <p
            className={` dark:text-white text-[#313E51] mt-5 text-xl variable-font sm:text-[32px] font-[450] block sm:leading-8 max-w-[465px]`}
          >
            {currentQuestion?.question}
          </p>
        </div>

        <progress
          className="  w-full progress-bar mt-[40px] max-w-[465px]"
          value={questionNumber}
          max={numOfQuestions}
        />
      </div>

      <div className="lg:flex lg:flex-col lg:w-full max-w-[564px]">
        <Options
          options={currentQuestion?.options}
          correctAnswer={currentQuestion?.answer}
        />

        {!hasAnswered && (
          <Button handleClick={handleSubmit}>Submit Answer</Button>
        )}

        {hasAnswered && +questionNumber !== numOfQuestions && (
          <Button handleClick={handleNextQuestion}>Next Question</Button>
        )}

        {+questionNumber === numOfQuestions && hasAnswered && (
          <Button handleClick={handleFinish}>Finish</Button>
        )}

        {error && (
          <div className="flex items-center justify-center gap-3">
            <Image
              src={ErrorIcon}
              alt="error-icon"
              className=""
              width={24}
              height={24}
            />
            <p className="rubik-regular dark:text-[#F4F6FA] text-[#EE5454]">
              Please select an answer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default McqFormat;
