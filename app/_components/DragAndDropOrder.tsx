import { useMemo, useState } from "react";
import { DragDropQuestion } from "../_data/types";
import Button from "./Button";
import { shuffleArray } from "../_utils/helpers";
import Progress from "./Progress";
import { useAppFeatures } from "../_context/AppContext";
import OrderingStep from "./OrderingStep";
import { useRouter } from "next/navigation";

interface DragAndDropFormatProps {
  currentQuestion: DragDropQuestion;
  numOfQuestions: number;
}
function DragAndDropOrder({
  currentQuestion,
  numOfQuestions,
}: DragAndDropFormatProps) {
  const { state, dispatch } = useAppFeatures();
  const { questionNumber, hasAnswered } = state;
  const router = useRouter();

  const shuffledRearrangedItems = useMemo(
    () => shuffleArray(currentQuestion?.draggableItems ?? []),
    [currentQuestion?.draggableItems]
  );

  const [orderedSteps, setOrderedSteps] = useState(shuffledRearrangedItems);
  const [correctIndexes, setCorrectIndexes] = useState<number[]>([]);

  // Function to move a step from one position to another.
  const moveStep = (dragIndex: number, hoverIndex: number) => {
    const updatedSteps = [...orderedSteps];
    const draggedStep = updatedSteps[dragIndex];
    // Remove the dragged item.
    updatedSteps.splice(dragIndex, 1);
    // Insert it at the new index.
    updatedSteps.splice(hoverIndex, 0, draggedStep);
    setOrderedSteps(updatedSteps);
  };

  function handleSubmit() {
    const correctOrder = currentQuestion?.correctOrder;
    const isCorrect =
      JSON.stringify(orderedSteps) === JSON.stringify(correctOrder);

    const newCorrectIndexes: number[] = [];
    orderedSteps.forEach((step, index) => {
      if (step === currentQuestion?.correctOrder?.[index]) {
        newCorrectIndexes.push(index);
      }
    });
    setCorrectIndexes(newCorrectIndexes);

    dispatch({ type: "submitAnswerDnd", payload: isCorrect });
  }

  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
    if (+questionNumber < numOfQuestions) {
      dispatch({ type: "setQuestionNumber" });
    }
  }

  function handleFinish() {
    router.push("/quiz/finish");
  }
  return (
    <div className="lg:flex  lg:items-start justify-between lg:gap-10 w-fit">
      <div className="mr-auto">
        <p className="italic-font text-sm dark:text-[#ABC1E1] text-[#4c4f55]">
          Question {questionNumber} of {numOfQuestions}
        </p>
        <p className=" dark:text-white text-[#313E51] mt-5 text-xl variable-font sm:text-[32px] font-[450] block sm:leading-8 max-w-[465px] mb-[120px]">
          {currentQuestion?.question}
        </p>

        <Progress
          questionNumber={questionNumber}
          numOfQuestions={numOfQuestions}
        />
      </div>

      <div className="flex flex-wrap gap-2  justify-center  max-w-[650px]">
        {orderedSteps.map((item, i) => (
          <OrderingStep
            key={item}
            item={item}
            index={i}
            moveStep={moveStep}
            id={item}
            isCorrect={correctIndexes.includes(i)}
          />
        ))}

        {!hasAnswered && (
          <Button handleClick={handleSubmit}>Submit Answer</Button>
        )}
        {hasAnswered && +questionNumber !== numOfQuestions && (
          <Button handleClick={handleNextQuestion}>Next Question</Button>
        )}
        {+questionNumber === numOfQuestions && hasAnswered && (
          <Button handleClick={handleFinish}>Finish</Button>
        )}
      </div>
    </div>
  );
}

export default DragAndDropOrder;
