import { useState } from "react";
import { useDrop } from "react-dnd";
import { useAppFeatures } from "../_context/AppContext";

interface DroppableItemsProps {
  item: string;
  correctMatches: { [key: string]: string };
  onItemDropped: (
    droppedItem: Record<string, string>,
    isCorrect: boolean
  ) => void;
  disableAllDraggables: boolean;
}
interface DragItem {
  item: string;
}

interface DropCollectedProps {
  isOver: boolean;
}

function DroppableItems({
  item,
  correctMatches,
  onItemDropped,
  disableAllDraggables,
}: DroppableItemsProps) {
  const [droppedItem, setDroppedItem] = useState("");
  const [status, setStatus] = useState("");
  const [hasDropped, setHasDropped] = useState(false);
  const { state } = useAppFeatures();
  const { hasAnswered } = state;
  const expectedDraggable = Object.keys(correctMatches).find(
    (draggable) => correctMatches[draggable] === item
  );

  const [{ isOver }, drop] = useDrop<DragItem, void, DropCollectedProps>(
    () => ({
      accept: "draggable",
      drop: (draggedItem: DragItem) => {
        const droppedObject: Record<string, string> = {
          [draggedItem.item]: draggedItem.item,
        };

        if (draggedItem.item === expectedDraggable) {
          setStatus("correct");
          console.log(draggedItem);
          setDroppedItem(draggedItem.item);
          onItemDropped(droppedObject, true);
        } else {
          setStatus("incorrect");
          setDroppedItem(expectedDraggable || "");
          onItemDropped(droppedObject, false);
        }
        setHasDropped(true);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),

      canDrop: () => !disableAllDraggables && !hasDropped,
    }),
    [expectedDraggable, onItemDropped, disableAllDraggables, hasDropped]
  );

  let bgColor = "#434c5e";
  if (status === "correct") {
    bgColor = "#26D782";
  } else if (status === "incorrect") {
    bgColor = "#EE5454";
  }

  return (
    <div
      className={`bg-[#] text-white  px-7 py-5  lg:py-8 lg:px-12  rounded-[16px] w flex justify-center items-center flex-col 
 
        `}
      ref={(node) => {
        drop(node);
      }}
      style={{
        opacity: !hasDropped && isOver ? 0.5 : 1,
        backgroundColor: bgColor,
      }}
    >
      {item}
      <p className="block text-[12px]">
        {status === "correct" && droppedItem && droppedItem}
        {status === "incorrect" &&
          disableAllDraggables &&
          droppedItem &&
          droppedItem}
      </p>
    </div>
  );
}

export default DroppableItems;
