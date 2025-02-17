interface ButtonProps {
  children: any;
  handleClick: () => void;
}

function Button({ children, handleClick }: ButtonProps) {
  return (
    <button
      className="bg-purple-500 mb-5 rounded-lg p-3 variable-font font-medium text-white flex items-center justify-center text-lg w-full max-w-[564px] lg:mt-[32px]"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
