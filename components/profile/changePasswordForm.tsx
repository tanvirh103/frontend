"use client";
import { updatePasswordSchema } from "@/app/profile/[id]/action";
import { updateUserPassword } from "@/resource/index.service";
import { ShowPassIcon } from "@/svg/authSvg";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import z from "zod";

export default function ChangePasswordForm({ userId }: { userId: string }) {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    const toastId = toast.loading("updating password...");
    const response = await updateUserPassword(userId, data);
    if (typeof response === "string" || typeof response === "undefined") {
      toast.error(
        response ?? "An error occurred while processing your request",
        { id: toastId }
      );
    } else {
      toast.success("Password updated successfully", { id: toastId });
      reset();
    }
  };

  return (
    <div className="col-span-1 md:col-span-2 w-full">
      <div className="bg-blue-50 rounded-2xl shadow-md p-6 h-full w-full">
        <h2 className="text-xl font-semibold mb-4">Update Password</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 h-full"
        >
          <div className="flex flex-col text-sm">
            <span className="mb-1">Current Password</span>
            <div className="relative w-full">
              <input
                {...register("oldPassword")}
                type={showCurrentPassword ? "text" : "password"}
                className="w-full border rounded px-3 py-2"
              />
              <ShowPassIcon
                showPassword={showCurrentPassword}
                setShowPassword={setShowCurrentPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
            {errors?.oldPassword && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.oldPassword?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col text-sm">
            <span className="mb-1">New Password</span>
            <div className="relative w-full">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full border rounded px-3 py-2"
              />
              <ShowPassIcon
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
            {errors?.password && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col text-sm">
            <span className="mb-1">Confirm New Password</span>
            <div className="relative w-full">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border rounded px-3 py-2"
              />
              <ShowPassIcon
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
            {errors?.confirmPassword && (
              <p className="text-red-500 block text-xs md:text-sm">
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
