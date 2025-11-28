"use client";

import { TagRemovingCrossButton } from "@/svg/authSvg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { updateUserValidationSchema } from "@/app/profile/[id]/action";
import { updateUserInfo } from "@/resource/index.service";

export default function UpdateForm({ user }: any) {
  const [tags, setTags] = useState<string[]>(user?.skills || []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateUserValidationSchema),
    defaultValues: {
      name: user?.name ?? "",
      bio: user?.bio ?? "",
      experience: user?.experience ?? "",
        resume: user?.resume ?? "",
      skills: user?.skills ?? [],
    },
  });
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();

      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
      }

      e.currentTarget.value = "";
    }
  };
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      skills: tags,
    };
    const toastId = toast.loading("Updating profile...");
    const response = await updateUserInfo(user._id, payload);
    if (typeof response === "string" || typeof response === "undefined") {
      toast.error(
        response ?? "An error occurred while processing your request",
        { id: toastId }
      );
      return;
    } else {
      toast.success("Profile updated successfully!", { id: toastId });
    }
    reset({
      ...data,
      skills: tags,
    });
  };
  return (
    <div className="w-full">
      <div className="bg-blue-50 rounded-2xl shadow-md p-6 h-full">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

        <form
          className="flex flex-col gap-3 h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
        
          <label className="flex flex-col text-sm">
            <span>Name</span>
            <input {...register("name")} className="border rounded px-3 py-2" />
            {errors?.name && (
              <p className="text-red-500 text-xs">{errors?.name?.message}</p>
            )}
          </label>

          
          <label className="flex flex-col text-sm">
            <span>Bio</span>
            <textarea
              {...register("bio")}
              rows={3}
              className="border rounded px-3 py-2"
            />
          </label>

         
          <label className="flex flex-col text-sm">
            <span>Experience</span>
            <input
              type="text"
              {...register("experience")}
              className="border rounded px-3 py-2"
            />
            {errors?.experience && (
              <p className="text-red-500 text-xs">
                {errors?.experience?.message}
              </p>
            )}
          </label>

   
          <div className="w-full">
            <p className="text-[#324054] mb-2">Skills (tags)</p>
            <div className="flex flex-wrap border rounded-md p-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#F6F6F6] text-black text-xs px-2 py-1 rounded-full flex items-center m-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-1"
                  >
                    <TagRemovingCrossButton />
                  </button>
                </span>
              ))}

              <input
                type="text"
                placeholder="Type & press comma"
                className="flex-1 min-w-[120px] border-none outline-none px-2 py-1 text-sm"
                onKeyDown={handleAddTag}
              />
            </div>
            <input type="hidden" {...register("skills")} value={tags} />
          </div>
           <label className="flex flex-col text-sm">
            <span>Resume Url</span>
            <input
              type="text"
              {...register("resume")}
              className="border rounded px-3 py-2"
            />
            {errors.resume && (
              <p className="text-red-500 text-xs">
                {errors.resume.message}
              </p>
            )}
          </label>  
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Profile Info"}
          </button>
        </form>
      </div>
    </div>
  );
}
