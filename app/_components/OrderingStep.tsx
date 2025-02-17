import { use, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppFeatures } from "../_context/AppContext";

const orderStepType = {
  step: "step",
};

interface OrderingStepProps {
  item: string;
  index: number;
  moveStep: (dragIndex: number, hoverIndex: number) => void;
  id: string;
  isCorrect: boolean;
}

function OrderingStep({
  item,
  index,
  moveStep,
  id,
  isCorrect,
}: OrderingStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { state } = useAppFeatures();
  const { hasAnswered } = state;

  const [, drop] = useDrop({
    accept: orderStepType.step,

    hover(item: any, monitor) {
      //   console.log("hover", item, monitor);
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveStep(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    canDrop: () => !hasAnswered,
  });

  const [{ isDragging }, drag] = useDrag({
    type: orderStepType.step,
    canDrag: () => !hasAnswered,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //   let bg = "#434c5e";
  //   if (hasAnswered && isCorrect) {
  //     bg = "#26D782";
  //   } else if (hasAnswered && !isCorrect) {
  //     bg = "#EE5454";
  //   }

  drag(drop(ref));
  return (
    <div
      className={`
         px-7 py-5 lg:py-8 lg:px-12 rounded-[16px] flex justify-center items-center cursor-grab
        shadow-xl dark:shadow-sm 
        ${
          hasAnswered && isCorrect
            ? "bg-green-500 dark:bg-green-400 text-white"
            : ""
        }
        ${
          hasAnswered && !isCorrect
            ? "bg-red-500 dark:bg-red-400 text-white"
            : ""
        }
        ${
          !hasAnswered
            ? "bg-white shadow-xl dark:bg-[#434c5e] dark:text-white text-[#313E51]"
            : ""
        }
      `}
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        // backgroundColor: bg,
      }}
    >
      {item}
    </div>
  );
}

export default OrderingStep;
