import Image from "next/image";
import htmlLogo from "@/public/assets/images/html-logo.png";
import Stats from "../_components/Stats";
import UpdateButtonAndModal from "../_components/UpdateButtonAndModal";

function LanguageAndStats() {
  return (
    <div className="row-start-1 row-end-4">
      <div className="border border-[#ebeff3] flex md:items-center px-2 py-6 rounded-xl flex-col md:flex-row gap-3 items-start pl-3 md:pl-0 ">
        <div className="flex md:items-center f flex-col md:flex-row gap-3 items-start  justify-self-start">
          <div className="w-24 ">
            <Image
              src={htmlLogo}
              alt="html logo"
              className="justify-self-start"
            />
          </div>

          <div className="ml-5 md:ml-0">
            <p className="text-[#010101] text-textPreset3 font-bold">
              Hyper Text Markup Language
            </p>
            <p className="text-[#4f5761] text-wrap">
              Questions: 08 | Duration: 15mins | Submitted on 5 June 2021
            </p>
          </div>
        </div>

        <UpdateButtonAndModal />
      </div>

      <Stats />
    </div>
  );
}

export default LanguageAndStats;
