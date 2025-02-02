import Image from "next/image";
import UpdateScoresForm from "./UpdateScoresForm";
import htmlLogo from "@/public/assets/images/html-logo.png";

interface Props {
  onCloseModal?: () => void;
}

function UpdateModal({ onCloseModal }: Props) {
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center ">
        <h1 className="font-bold text-[30px] text-black">Update Scores</h1>
        <Image src={htmlLogo} alt="html logo" className="w-[70px]" />
      </div>

      <UpdateScoresForm onCloseModal={onCloseModal} />
    </div>
  );
}

export default UpdateModal;
