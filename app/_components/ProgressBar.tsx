interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
}

function ProgressBar({ value, max = 100, color }: ProgressBarProps) {
  return (
    <progress
      value={value}
      max={max}
      className={`w-full    rounded-full   h-4 progress-bar-${color} self-center bg-red-800 `}
    />
  );
}

export default ProgressBar;
