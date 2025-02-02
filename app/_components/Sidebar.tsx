"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

import { navLinks } from "../_data/data";

interface ListButtonProps {
  to: string;
  src: string;
  activeSrc: string;
  name: string;
  isMinimized: boolean;
}

function Sidebar() {
  return (
    <aside className=" text-[#565c67]  xl:pb-14 xl:flex xl:flex-col items-start px-4 md:px-10 xl:px-0 xl:pr-3 xl:border-r  xl:border-gray-200 order-2 xl:order-1">
      <ul className="flex items-center justify-between xl:flex-col xl:items-start xl:w-full mt-12 ">
        {navLinks.map((link) => (
          <ListButton
            to={link.to}
            src={link.src}
            activeSrc={link.activeSrc}
            name={link.name}
            key={link.name}
          />
        ))}
      </ul>
    </aside>
  );
}

const ListButton: React.FC<ListButtonProps> = ({
  to,
  src,
  name,
  activeSrc,
}) => {
  const base =
    "px-3 pt-2 items-center  justify-center pb-1 xl:px-0  xl:py-4 text-primaryGrey-300 transisition-colors duration-300  ";
  const isActiveStyles =
    " bg-[#f4f6f8] xl:rounded-r-full  rounded-t-full xl:rounded-l-none";

  const pathName = usePathname();
  const isActive = pathName === to;

  return (
    <Link href={to} className={`${base} ${isActive ? isActiveStyles : ""}`}>
      {
        <button className="flex flex-col items-center xl:flex-row xl:ml-6 xl:gap-4 xl:w-full  delay xl:pr-20">
          <Image
            height={10}
            width={10}
            src={isActive ? activeSrc : src}
            alt="icon"
            className="w-6 h-6"
          />

          <motion.p
            className="hidden md:block text-textPreset5Bold   xl:text-textPreset3 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", type: "tween" }}
            style={{
              color: isActive ? "#4d5ecf" : "#565a62",
            }}
          >
            {name}
          </motion.p>
        </button>
      }
    </Link>
  );
};

export default Sidebar;
