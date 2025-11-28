//global import
import { deleteJobPost } from "@/resource/index.service";
import { useEffect, useRef } from "react";

//local import

import toast from "react-hot-toast";

export default function DeleteJob({
  setShow,
  jobId,
}: {
  setShow: (show: boolean) => void;
  jobId: string | null;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleOutSideClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [modalRef, setShow]);
  const deleteJob = async (id: string) => {
    const res = await deleteJobPost(id);
    if (typeof res === "string") {
      toast.error(res);
    } else {
      toast.success("Job post deleted successfully");
      setShow(false);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000066] grid place-items-center backdrop-blur-sm z-300">
      <div
        ref={modalRef}
        className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] bg-white rounded-xl p-4 relative"
      >
        <h3 className="text-text-color text-sm md:text-base xl:text-lg font-semibold text-left">
          Are you want to delete the job post?
        </h3>
        <p className="text-text-color text-sm md:text-sm xl:text-base font-medium text-left">
          This job post will be deleted.
        </p>
        <div className="flex gap-4 justify-end items-center pt-4">
          <button
            onClick={() => {
              setShow(false);
            }}
            className="bg-blue-300 font-bold text-lg md:text-xl rounded-full px-2 py-2 md:px-4 md:py-2 border-text-red border hover:text-navbar-button-text cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteJob(jobId ?? "")}
            className="bg-red-400 font-bold text-base md:text-lg px-2 py-2 md:px-4 md:py-2 rounded-full cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
