"use client";
import Button from "@/app/_components/Button";
import LogoAndTitle from "@/app/_components/LogoAndTitle";
import { useAppFeatures } from "@/app/_context/AppContext";
import { useRouter } from "next/navigation";

function Page() {
  const { state, dispatch } = useAppFeatures();
  const { points, subjectPicked } = state;
  const router = useRouter();
  function handleClick() {
    router.push("/");
    dispatch({ type: "reset" });
    localStorage.setItem("points", "0");
  }
  return (
    <div className="mt-7 mx-[24px] mb-16 lg:flex w-full lg:items-start lg:justify-between lg:px-[5rem] relative z-10 overflow-hidden">
      <p className="text-4xl  variable-font  tracking-wide font-[50] dark:text-white text-[#313E51] mb-[40px] sm:text-[48px] w-full lg:text-5xl ">
        Quiz completed <br />
        <strong className="font-semibold">You scored...</strong>
      </p>
      <div className=" lg:w-full max-w-[564px]">
        <div className="h-[242px] dark:bg-[#3B4D66] bg-white p-[32px] shadow-xl rounded-xl flex items-center flex-col mb-[12px]">
          <div className="flex items-center justify-center gap-4 variable-font font-semibold text-[#313E51]">
            <LogoAndTitle
              title={subjectPicked?.title}
              icon={subjectPicked?.icon}
            />
          </div>
          <p className="mt-4 rubik-medium text-8xl  dark:text-white text-[#313E51]">
            {+points}
          </p>
          <p className="dark:text-[#ABC1E1] text-[#626C7F] variable-font font-normal">
            out of 15
          </p>
        </div>
        <Button handleClick={handleClick}>Play Again</Button>
      </div>
    </div>
  );
}

export default Page;
