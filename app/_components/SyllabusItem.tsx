import ProgressBar from "./ProgressBar";

interface Props {
  //   data: {
  colorName: string;
  colorValue: string;
  title: string;
  percentage: number;
  //   };
}

function SyllabusItem({ colorName, colorValue, title, percentage }: Props) {
  //   console.log(colorName, colorValue, title, percentage);
  return (
    <>
      <p className="text-[#6e7178] mt-6">{title}</p>

      <div className="flex items-center gap-3 mt-6 ">
        <ProgressBar value={percentage} color={colorName} />
        <p style={{ color: colorValue, fontWeight: 700 }}>{percentage}%</p>
      </div>
    </>
  );
}

export default SyllabusItem;
