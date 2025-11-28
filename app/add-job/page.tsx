'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { jobValidationSchema } from "./action";
import { createJobPost } from "@/resource/index.service";
import { getCookie } from "cookies-next/client";
import { appConfig } from "@/config/app.config";

export default function AddJobPage() {
    const userCookie=getCookie(appConfig.AUTH_USER_COOKIE);
  const user=userCookie?JSON.parse(userCookie):null;
  const userId=user?.user;
    const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobValidationSchema),
  });

  const onSubmit = async (data: z.infer<typeof jobValidationSchema>) => {
    const toastId = toast.loading("Creating Job Post...");
    const response = await createJobPost(data);
    if (typeof response === "string"|| typeof response ==="undefined") {
      toast.error(response?? "An error occurred while processing your request",{ id: toastId });
    } else {
      toast.success("Job post created successfully",{ id: toastId });
      reset();
      window.location.href = "/";
    }
  };
  return (
    <div className="container mx-auto gap-6 px-3 md:px-0 mt-8">
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-blue-50 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-medium text-center mb-4">
            Create Job Post
          </h2>
          <div className="space-y-1 md:space-y-2">
            <p className="w-full">
              <span className=" block">Job Title</span>
              <input
                type="text"
                {...register("title")}
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
                rows={3}{...register("description")}
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
                <label className="flex items-center space-x-2">
                  <input type="radio" {...register("jobType")} value="Full-time" />
                  <span>Full Time</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" {...register("jobType")} value="Part-time" />
                  <span>Part Time</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" {...register("jobType")} value="Remote" />
                  <span>Remote</span>
                </label>
              </p>
            </div>
            {errors?.jobType && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.jobType?.message}
              </p>
            )}
            <input type="hidden" {...register("employer")} value={user?.role==="employer"&&userId} />
            <button type="submit" className={`bg-amber-400 font-normal text-sm md:text-base rounded-full text-center shadow-md px-4 py-2 w-full block hover:bg-amber-500 mt-4 ${isSubmitting ? "opacity-50" : ""}`} disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Job Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
