"use client";

import { useDrag } from "react-dnd";

function DraggableItem({
  item,
  isDisabled,
}: {
  item: string;
  isDisabled: boolean;
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "draggable",
      item: { item },
      canDrag: () => !isDisabled,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [isDisabled, item]
  );
  return (
    <div
      className={`dark:bg-[#434c5e] bg-white shadow-xl dark:shadow-none text-[#434c5e] dark:text-white  px-7 py-5  lg:py-8 lg:px-12  rounded-[16px] w flex justify-center items-center cursor-grab w-fit ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }  
      `}
      ref={(node) => {
        drag(node);
      }}
      style={{
        opacity: isDragging || isDisabled ? 0.5 : 1,
      }}
    >
      {item}
    </div>
  );
}

export default DraggableItem;
