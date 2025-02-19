// components/CustomDragLayer.tsx
import React from "react";
import { useDragLayer } from "react-dnd";

const layerStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(initialOffset: any, currentOffset: any) {
  if (!initialOffset || !currentOffset) {
    return { display: "none" };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default function CustomDragLayer() {
  const { item, isDragging, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      isDragging: monitor.isDragging(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
    })
  );

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <div className="dark:bg-[#434c5e] bg-white shadow-xl dark:shadow-none text-[#434c5e] dark:text-white  px-7 py-5  lg:py-8 lg:px-12  rounded-[16px] w flex justify-center items-center cursor-grab w-fit ">
          {item && item.id}
        </div>
      </div>
    </div>
  );
}
