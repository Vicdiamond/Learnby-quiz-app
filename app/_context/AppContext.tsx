"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
// import data from "@/public/data.json";
import dataWithDnd from "@/public/dataWithDnd.json";
import { usePathname } from "next/navigation";

interface AppFeaturesContextType {
  state: any;
  dispatch: React.Dispatch<any>;
}

const initialState = {
  // quizzes: data.quizzes,
  mainQuizzes: dataWithDnd.quizzes,
  subjectPicked: {},
  questionNumber: "1",
  hasAnswered: false,

  points:
    typeof window !== "undefined" ? Number(localStorage.getItem("points")) : 0,
  clickedOption: "",
  isCorrect:
    typeof window !== "undefined" &&
    (localStorage.getItem("isCorrect") === "true" ? true : false),
  error: false,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "pickSubject": {
      localStorage.setItem("subjectTitle", action.payload.title);
      return { ...state, subjectPicked: action.payload };
    }

    case "pickedOption":
      return {
        ...state,
        clickedOption: action.payload,
        error: false,
      };

    case "checkClickedOption":
      return {
        ...state,
        error: state.clickedOption === "" ? (state.error = true) : state.error,
      };

    case "fixHydrationError":
      return {
        ...state,
        questionNumber:
          localStorage.getItem("question") || state.questionNumber,
        hasAnswered: localStorage.getItem("hasAnswered") === "true",
      };

    case "setQuestionNumber":
      localStorage.setItem("question", `${+state.questionNumber + 1}`);
      return {
        ...state,
        questionNumber: +state.questionNumber + 1,
      };

    case "setHasAnswered":
      return {
        ...state,
        hasAnswered: action.payload,
      };

    case "submitAnswer":
      const curAnsweredQuestion = state.subjectPicked.questions.at(
        Number(localStorage.getItem("question")) - 1
      );
      const isCorrect = curAnsweredQuestion.answer === state.clickedOption;
      if (isCorrect) {
        localStorage.setItem("points", `${+state.points + 1}`);
        localStorage.setItem("hasAnswered", `true`);
        localStorage.setItem("isCorrect", `true`);
      } else {
        localStorage.setItem("hasAnswered", `true`);
        localStorage.setItem("isCorrect", `false`);
      }
      return {
        ...state,
        hasAnswered: true,
        points: isCorrect ? state.points + 1 : state.points,
        isCorrect:
          curAnsweredQuestion.answer === state.clickedOption
            ? (state.isCorrect = true)
            : state.isCorrect,
      };

    case "submitAnswerDnd":
      localStorage.setItem("hasAnswered", `true`);
      if (action.payload.isCorrect) {
        localStorage.setItem("points", `${+state.points + 1}`);
      }
      return {
        ...state,
        hasAnswered: true,
      };

    case "submitMatchedDnd":
      localStorage.setItem("points", `${+state.points + 1}`);
      localStorage.setItem("hasAnswered", `true`);
      localStorage.setItem("isCorrect", `true`);
      return {
        ...state,
        hasAnswered: true,
        points: state.points + 1,
        isCorrect: true,
      };

    case "nextQuestion":
      localStorage.setItem("hasAnswered", `false`);
      localStorage.setItem("isCorrect", `false`);

      return {
        ...state,
        hasAnswered: false,
        clickedOption: "",
        isCorrect: false,
      };

    case "reset":
      localStorage.setItem("hasAnswered", `false`);
      localStorage.setItem("isCorrect", `false`);
      return {
        ...initialState,
      };

    default:
      throw new Error("No action found");
  }
}

const AppFeaturesContext = createContext<AppFeaturesContextType | undefined>(
  undefined
);

function AppFeaturesProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const pathname = usePathname();

  // console.log(dataWithDnd);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTitle = localStorage.getItem("subjectTitle");
      if (storedTitle) {
        // const foundSubject = data.quizzes.find(
        //   (item) => item.title === storedTitle
        // );
        const foundSubject = dataWithDnd.quizzes.find(
          (item) => item.title === storedTitle
        );
        if (foundSubject) {
          dispatch({ type: "pickSubject", payload: foundSubject });
        }
      }
      if (pathname === "/") {
        localStorage.setItem("points", "0");
        dispatch({ type: "reset" });
      }
    }
  }, [pathname]);

  return (
    <AppFeaturesContext.Provider value={{ state, dispatch }}>
      {children}
    </AppFeaturesContext.Provider>
  );
}

function useAppFeatures() {
  const context = useContext(AppFeaturesContext);
  if (context === undefined) {
    throw new Error("useAppFeatures must be used within a AppFeaturesProvider");
  }
  return context;
}

export { AppFeaturesProvider, useAppFeatures };
