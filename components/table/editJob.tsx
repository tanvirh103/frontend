
//global import
import { updateJob } from "@/app/add-job/action";
import { updateJobPost } from "@/resource/index.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

//local import

import toast from "react-hot-toast";
import z from "zod";

export default function EditJobs({
  setShow,
  job,
}: {
  setShow: (show: boolean) => void;
  job: any;
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
   const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateJob),
  });

  const onSubmit = async (data: z.infer<typeof updateJob>) => {
    const toastId = toast.loading("Updating Job Post...");
    const response = await updateJobPost(job._id,data);
    if (typeof response === "string"|| typeof response ==="undefined") {
      toast.error(response?? "An error occurred while processing your request",{ id: toastId });
    } else {
      toast.success("Job post updated successfully",{ id: toastId });
      setShow(false);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000066] grid place-items-center backdrop-blur-sm z-300">
      <div
        ref={modalRef}
        className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] bg-white rounded-xl p-4 relative"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold mb-4">Edit Job</h2>
           <div className="space-y-1 md:space-y-2">
            <p className="w-full">
              <span className=" block">Job Title</span>
              <input
                type="text"
                {...register("title")}
                defaultValue={job?.title}
                className="border rounded px-3 py-2 w-full"
                placeholder="Enter job title"
              />
            </p>
            {errors?.title && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.title?.message}
              </p>
            )}
            <p className="w-full">
              <span className=" block">Job Description</span>
              <textarea
                rows={3}
                {...register("description")}
                defaultValue={job?.description}
                className="border rounded px-3 py-2 w-full"
                placeholder="Enter job description"
              />
            </p>
            {errors?.description && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.description?.message}
              </p>
            )}
            <p className="w-full">
              <span className=" block">Company</span>
              <input
                type="text"
                {...register("company")}
                defaultValue={job?.company}
                className="border rounded px-3 py-2 w-full"
                placeholder="Enter company name"
              />
            </p>
            {errors?.company && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.company?.message}
              </p>
            )}
            <p className="w-full">
              <span className=" block">Location</span>
              <input
                type="text"
                {...register("location")}
                defaultValue={job?.location}
                className="border rounded px-3 py-2 w-full"
                placeholder="Enter job location"
              />
            </p>
            {errors?.location && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.location?.message}
              </p>
            )}
            <p className="w-full">
              <span className=" block">Salary Range</span>
              <input
                type="text"
                {...register("salaryRange")}
                defaultValue={job?.salaryRange}
                className="border rounded px-3 py-2 w-full"
                placeholder="Enter salary range(e.g., 50000-70000)"
              />
            </p>
            {errors?.salaryRange && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.salaryRange?.message}
              </p>
            )}
            <div className="w-full">
              <span className=" block">Job Type</span>
              <p className="flex justify-start gap-6 mt-2">
                <div role="radiogroup" aria-label="Job Type" className="flex gap-6">
                    {["Full-time", "Part-time", "Remote"].map((type) => (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                {...register("jobType")}
                                name="jobType"
                                value={type}
                                defaultChecked={job?.jobType === type}
                                className="accent-amber-400"
                            />
                            <span>{type === "Full-time" ? "Full Time" : type === "Part-time" ? "Part Time" : "Remote"}</span>
                        </label>
                    ))}
                </div>
              </p>
            </div>
            {errors?.jobType && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.jobType?.message}
              </p>
            )}
            <button type="submit" className={`bg-amber-400 font-normal text-sm md:text-base rounded-full text-center shadow-md px-4 py-2 w-full block hover:bg-amber-500 mt-4 ${isSubmitting ? "opacity-50" : ""}`} disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Job Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
