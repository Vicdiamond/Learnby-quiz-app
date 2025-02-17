function Progress({
  questionNumber,
  numOfQuestions,
}: {
  questionNumber: number;
  numOfQuestions: number;
}) {
  return (
    <progress
      className="  w-full progress-bar mt-[40px] max-w-[465px]"
      value={questionNumber}
      max={numOfQuestions}
    />
  );
}

export default Progress;
