"use client";
import Image from "next/image";
import LogoAndTitle from "./LogoAndTitle";
import { useDarkMode } from "../_context/DarkModeContext";
import { useAppFeatures } from "../_context/AppContext";
import { usePathname } from "next/navigation";

function Header() {
  const { toggleDarkMode } = useDarkMode();
  const { state } = useAppFeatures();
  const pathname = usePathname();
  const { subjectPicked } = state;
  const showLogoAndTitle = pathname !== "/";

  return (
    <div className="p-5 flex  items-center sm:p-10 lg:mx-[5rem] lg:px-0  justify-between">
      <div className="flex items-center gap-4 variable-font font-semibold text-[#313E51]">
        {showLogoAndTitle && (
          <LogoAndTitle
            title={subjectPicked?.title}
            icon={subjectPicked?.icon}
          />
        )}
      </div>
      <div className="flex items-center gap-1 ml-auto">
        <div className="dark:block">
          <Image
            alt="sun-dark"
            src="/assets/images/icon-sun-light.svg"
            className=""
            width={20}
            height={20}
          />
        </div>

        <div className="dark:hidden">
          <Image
            alt="sun-brigth"
            src="/assets/images/icon-sun-dark.svg"
            className=""
            width={20}
            height={20}
          />
        </div>

        <div
          className="bg-purple-500 h-5 w-10 px-1 flex items-center rounded-full relative cursor-pointer"
          onClick={toggleDarkMode}
        >
          <div className="bg-white h-3 w-3 rounded-full dark:hidden"></div>
          <div className="bg-white h-3 w-3 rounded-full  ml-auto hidden dark:block"></div>
        </div>

        <div className="dark:block hidden">
          <Image
            alt="moon-dark"
            src="/assets/images/icon-moon-light.svg"
            className=""
            width={20}
            height={20}
          />
        </div>

        <div className="dark:hidden">
          <Image
            alt="moon-brigth"
            src="/assets/images/icon-moon-dark.svg"
            className=""
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
