import { useMemo, useState } from "react";
import { DragDropQuestion } from "../_data/types";
import DraggableItem from "./DraggableItem";
import DroppableItems from "./DroppableItems";
import Progress from "./Progress";
import { shuffleArray } from "../_utils/helpers";
import { useAppFeatures } from "../_context/AppContext";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface DragAndDropFormatProps {
  currentQuestion: DragDropQuestion;
  numOfQuestions: number;
}

function DragAndDropMatches({
  currentQuestion,
  numOfQuestions,
}: DragAndDropFormatProps) {
  const { state, dispatch } = useAppFeatures();
  const { questionNumber, hasAnswered } = state;
  const [matchedItems, setMatchedItems] = useState<Record<string, boolean>>({});
  const [disableAllDraggables, setDisableAllDraggables] = useState(
    hasAnswered || false
  );
  const router = useRouter();

  const shuffledDroppableItems = useMemo(
    () => shuffleArray(currentQuestion?.droppableItems ?? []),
    [currentQuestion?.droppableItems]
  );

  function handleItemDrop(
    draggedItem: Record<string, string>,
    isCorrect: boolean
  ) {
    const key = Object.keys(draggedItem)[0];
    if (isCorrect) {
      setMatchedItems((prev) => ({ ...prev, [key]: true }));

      if (Object.keys(matchedItems).length == 3) {
        dispatch({ type: "submitMatchedDnd" });
      }
    } else {
      setDisableAllDraggables(true);
      dispatch({ type: "setHasAnswered", payload: true });

      localStorage.setItem("hasAnswered", "true");
    }
  }

  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
    dispatch({ type: "setQuestionNumber" });
  }

  function handleFinish() {
    router.push("/quiz/finish");
  }

  return (
    <>
      <div className="lg:flex lg:flex-col lg:items-start lg:justify-between lg:gap-10 w-fit">
        <div className="mr-auto">
          <p className="italic-font text-sm dark:text-[#ABC1E1] text-[#4c4f55]">
            Question {questionNumber} of {numOfQuestions}
          </p>
          <p className=" dark:text-white text-[#313E51] mt-5 text-xl variable-font sm:text-[32px] font-[450] block sm:leading-8 max-w-[465px]">
            {currentQuestion?.question}
          </p>
        </div>

        <Progress questionNumber={1} numOfQuestions={10} />
      </div>

      <div className="lg:flex lg:flex-col lg:w-full max-w-[564px]">
        <div className="lg:flex lg:w-full   flex-col items-start ">
          <p className="italic-font text-sm dark:text-[#ABC1E1] text-[#4c4f55] mb-3">
            Drag these items to their correct matches
          </p>
          <div className="flex flex-wrap gap-2  justify-center ">
            {currentQuestion?.draggableItems?.map((item) => (
              <DraggableItem
                key={item}
                item={item}
                isDisabled={disableAllDraggables || !!matchedItems[item]}
              />
            ))}
          </div>
        </div>

        <div className="my-10 ">
          <p className="italic-font text-sm dark:text-[#ABC1E1] text-[#4c4f55] mb-3">
            Drop items here
          </p>

          <div className="grid grid-cols-auto   min-[668px]:grid-cols-2   gap-3 items-stretch justify-items-stretch ">
            {shuffledDroppableItems.map((item) => (
              <DroppableItems
                key={item}
                item={item}
                correctMatches={currentQuestion?.correctMatches || {}}
                onItemDropped={handleItemDrop}
                disableAllDraggables={disableAllDraggables}
              />
            ))}
          </div>
        </div>

        {(Object.keys(matchedItems).length == 4 || disableAllDraggables) &&
          +questionNumber !== numOfQuestions && (
            <Button handleClick={handleNextQuestion}>Next Question</Button>
          )}

        {+questionNumber === numOfQuestions && hasAnswered && (
          <Button handleClick={handleFinish}>Finish</Button>
        )}
      </div>
    </>
  );
}

export default DragAndDropMatches;
