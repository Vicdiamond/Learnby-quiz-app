import DragAndDropMatches from "@/app/_components/DragAndDropMatches";
import DragAndDropOrder from "@/app/_components/DragAndDropOrder";
import { DragDropQuestion } from "@/app/_data/types";

interface DragAndDropFormatProps {
  currentQuestion: DragDropQuestion;
  numOfQuestions: number;
}

function DragAndDropFormat({
  currentQuestion,
  numOfQuestions,
}: DragAndDropFormatProps) {
  return (
    <div className="p-5 mb-12 lg:mb-0 w-full sm:p-10 lg:flex lg:items-start lg:justify-between lg:px-[5rem] z-10 relative gap-2">
      {currentQuestion.correctOrder && (
        <DragAndDropOrder
          currentQuestion={currentQuestion}
          numOfQuestions={numOfQuestions}
        />
      )}
      {!currentQuestion.correctOrder && (
        <DragAndDropMatches
          currentQuestion={currentQuestion}
          numOfQuestions={numOfQuestions}
        />
      )}
    </div>
  );
}

export default DragAndDropFormat;
