"use client";

import { useForm } from "react-hook-form";
import { useAppFeatures } from "../_context/AppContext";

interface Props {
  onCloseModal?: () => void;
}
function UpdateScoresForm({ onCloseModal }: Props) {
  const { register, handleSubmit, formState } = useForm();
  const { handleUserData } = useAppFeatures();

  const errors = formState.errors;

  function onSubmit(data: any) {
    // console.log(data);
    handleUserData(data);

    onCloseModal?.();
  }

  //   console.log(errors);
  return (
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center gap-3">
          <p className="bg-[#132277] text-white rounded-full py-1 px-3 ">1</p>
          <p>
            Update your <span className="font-bold">Rank</span>
          </p>
        </div>

        <div>
          <input
            type="number"
            className={`border-2 py-2 px-3  rounded-lg outline-none  ${
              errors.rank?.message
                ? "border-secondary-red "
                : "border-[#d4e3fd]  "
            }`}
            placeholder="Rank"
            {...register("rank", {
              required: "Rank is required",
              validate: (value) =>
                Number(value) > 0 || "Rank must be greater than 0",
            })}
          />

          {errors.rank && (
            <p className="text-secondary-red text-textPreset5 font-normal">
              {String(errors.rank?.message)}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap mt-4">
        <div className="flex items-center gap-3">
          <p className="bg-[#132277] text-white rounded-full py-1 px-3 ">2</p>
          <p>
            Update your <span className="font-bold">Percentile</span>
          </p>
        </div>

        <div>
          <input
            type="number"
            placeholder="Percentile"
            className={`border py-2 px-3 rounded-lg outline-none  ${
              errors.percentile?.message
                ? "border-secondary-red focus:ring-secondary-red "
                : "border-[#d4e3fd] focus:border-[#d4e3fd] "
            }`}
            {...register("percentile", {
              required: "Percentile is required",
              validate: (value) =>
                (Number(value) > 0 && Number(value) <= 100) ||
                "Percentile must be within 1 and 100",
            })}
          />

          {errors.percentile && (
            <p className="text-secondary-red text-textPreset5 font-normal">
              {String(errors.percentile?.message)}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap mt-4">
        <div className="flex items-center gap-3">
          <p className="bg-[#132277] text-white rounded-full py-1 px-3 ">3</p>
          <p className="text-wrap max-w-[250px]">
            Update your{" "}
            <span className="font-bold">Current score {`(out of 15)`}</span>
          </p>
        </div>

        <div>
          <input
            type="number"
            className={`border py-2 px-3 rounded-lg outline-none  ${
              errors.score?.message
                ? "border-secondary-red focus:ring-secondary-red "
                : "border-[#d4e3fd] focus:border-[#d4e3fd] "
            }`}
            placeholder="Score"
            {...register("score", {
              required: "Score is required",
              validate: (value) =>
                (Number(value) > 0 && Number(value) <= 15) ||
                "Score must be within 1 and 15",
            })}
          />

          {errors.score && (
            <p className="text-secondary-red text-textPreset5 font-normal">
              {String(errors.score?.message)}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-3">
        <button className="border border-[#132277]  py-3 px-5 rounded-full text-[#132277] font-semibold">
          Cancel
        </button>
        <button className="bg-[#132277] text-white py-3 px-5 rounded-full font-semibold">
          Save
        </button>
      </div>
    </form>
  );
}

export default UpdateScoresForm;
