"use client";
import Image from "next/image";
import { useAppFeatures } from "../_context/AppContext";
import OptionContainer from "./OptionContainer";

function Options({ options, correctAnswer }: any) {
  const { state } = useAppFeatures();
  const optionLetters = ["A", "B", "C", "D"];
  const { isCorrect, hasAnswered, clickedOption } = state;

  return (
    <div className="max-w-[564px]">
      {options?.map((option: any, i: number) => (
        <OptionContainer
          key={option}
          actionType="pickedOption"
          payload={option}
          hasAnswered={hasAnswered}
        >
          <div className="flex items-center justify-between w-full gap-5">
            <div className="flex items-center gap-5">
              <p
                className={`${
                  clickedOption === option && isCorrect && hasAnswered
                    ? "bg-[#26D782] text-white"
                    : clickedOption === option && !isCorrect && hasAnswered
                    ? "bg-[#EE5454] text-white"
                    : "bg-[#F4F6FA]"
                } flex items-center justify-center rounded-lg w-10 h-10`}
              >
                {optionLetters[i]}
              </p>
              <p className="text-[18px] dark:text-white text-[#313E51]">
                {option}
              </p>
            </div>
            <div className="">
              <>
                {correctAnswer === option && hasAnswered && (
                  <Image
                    src="/assets/images/icon-correct.svg"
                    alt="correct icon"
                    width={24}
                    height={24}
                  />
                )}

                {clickedOption === option &&
                  correctAnswer !== option &&
                  hasAnswered && (
                    <Image
                      src="/assets/images/icon-incorrect.svg"
                      alt="correct icon"
                      width={24}
                      height={24}
                    />
                  )}
              </>
            </div>
          </div>
        </OptionContainer>
      ))}
    </div>
  );
}

export default Options;
