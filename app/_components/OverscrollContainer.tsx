function OverscrollContainer({
  children,
  height,
}: {
  children: React.ReactNode;
  height: string;
}) {
  return (
    <div
      className={`overflow-hidden   w-full rounded-xl `}
      style={{ height: height }}
    >
      <div className="overflow-auto h-full scrollbar-thin">{children}</div>
    </div>
  );
}

export default OverscrollContainer;
