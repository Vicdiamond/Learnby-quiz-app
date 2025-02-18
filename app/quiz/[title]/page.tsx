"use client";

import { useAppFeatures } from "@/app/_context/AppContext";
import { useEffect } from "react";
import DragAndDropFormat from "./DragAndDropFormat";
import McqFormat from "./McqFormat";
import { useRouter } from "next/navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend } from "react-dnd-multi-backend";
import { TouchTransition } from "react-dnd-multi-backend";

const HTML5toTouchConfig = {
  backends: [
    {
      backend: HTML5Backend,
    },
    {
      backend: TouchBackend,
      preview: true,
      transition: TouchTransition,
    },
  ],
};

function Page() {
  const { state, dispatch } = useAppFeatures();
  const router = useRouter();

  const { subjectPicked, clickedOption, questionNumber } = state;

  // Needed to solve hydration error
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch({ type: "fixHydrationError" });
    }
  }, [dispatch]);

  const currentQuestion = subjectPicked?.questions?.[+questionNumber - 1];
  const numOfQuestions = subjectPicked?.questions?.length;

  function handleSubmit() {
    if (!currentQuestion?.type) {
      if (clickedOption === "") {
        dispatch({ type: "checkClickedOption" });
        return;
      }
      dispatch({ type: "submitAnswer", payload: clickedOption });
    }
  }

  function handleFinish() {
    router.push("/quiz/finish");
  }

  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
    if (+questionNumber < numOfQuestions) {
      dispatch({ type: "setQuestionNumber" });
    }
  }

  return (
    <div>
      {!currentQuestion?.type && (
        <McqFormat
          currentQuestion={currentQuestion}
          numOfQuestions={numOfQuestions}
          handleSubmit={handleSubmit}
          handleNextQuestion={handleNextQuestion}
          handleFinish={handleFinish}
        />
      )}
      {currentQuestion?.type && (
        <DndProvider backend={MultiBackend} options={HTML5toTouchConfig}>
          <DragAndDropFormat
            currentQuestion={currentQuestion}
            numOfQuestions={numOfQuestions}
          />
        </DndProvider>
      )}
    </div>
  );
}

export default Page;
