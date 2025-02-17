"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAppFeatures } from "../_context/AppContext";
import { QuizType } from "../_data/types";

interface OptionContainerProps {
  children: any;
  actionType: string;
  payload: QuizType;
  hasAnswered?: boolean;
}

function OptionContainer({
  children,
  actionType,
  payload,
  hasAnswered = false,
}: OptionContainerProps) {
  const { dispatch, state } = useAppFeatures();

  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  let borderStyle = "";
  if (state.clickedOption === payload && !hasAnswered) {
    borderStyle = "border-[3px] border-[#a729f5]";
  } else if (state.clickedOption === payload && hasAnswered) {
    borderStyle = state.isCorrect
      ? "border-[3px] border-[#26D782]"
      : "border-[3px] border-[#EE5454]";
  }

  function handleClick() {
    dispatch({ type: actionType, payload });

    if (isHome) {
      router.push(`/quiz/${payload.title.toLowerCase()}`);
      localStorage.setItem("question", "1");
    }
  }

  return (
    <button
      className={` dark:bg-[#3B4D66] bg-white mb-3 shadow-xl rounded-lg p-3 rubik-medium font-medium text-[#313E51] flex items-center gap-4 text-lg w-full ${borderStyle}`}
      onClick={handleClick}
      disabled={hasAnswered}
    >
      {children}
    </button>
  );
}

export default OptionContainer;
