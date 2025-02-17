import Image from "next/image";

function LogoAndTitle({ title, icon }: { title: string; icon: string }) {
  const getBackgroundClass = (title: string) => {
    switch (title) {
      case "HTML":
        return "bg-[#FFF1E9]";
      case "CSS":
        return "bg-[#E0FDEF]";
      case "JavaScript":
        return "bg-[#EBF0FF]";
      case "Accessibility":
        return "bg-[#F6E7FF]";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={`${getBackgroundClass(title)} p-2 rounded-lg z-10`}>
        {icon && (
          <Image
            src={icon.slice(1)}
            alt={`${title} icon`}
            className="h-6"
            width={25}
            height={25}
          />
        )}
      </div>
      <p className="dark:text-white text-[#313E51] z-10">{title}</p>
    </>
  );
}

export default LogoAndTitle;
