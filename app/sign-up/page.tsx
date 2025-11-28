"use client";
import { ShowPassIcon } from "@/svg/authSvg";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { userValidationSchema } from "./action";
import { createUser } from "@/resource/index.service";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userValidationSchema),
  });

  const onSubmit = async (data: z.infer<typeof userValidationSchema>) => {
    const toastId = toast.loading("Creating account...");
    const response = await createUser(data);
    if (typeof response === "string" || typeof response === "undefined") {
      toast.error(
        response ?? "An error occurred while processing your request",
        { id: toastId }
      );
    } else {
      toast.success("Account created successfully", { id: toastId });
      reset();
      window.location.href = "/";
    }
  };

  return (
    <div className="container mx-auto px-3 md:px-0 h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit  )}
        className="bg-blue-50 rounded-2xl shadow-md px-2 py-4 md:px-4 w-full max-w-lg space-y-1 md:space-y-2"
      >
        <label className="block font-normal text-sm md:text-base lg:text-lg">
          Full Name:
        </label>
        <input
          type="text"
          {...register("name")}
          placeholder="Enter your full name"
          className="w-full p-2 rounded-md bg-amber-50 outline-none font-normal text-sm md:text-base focus:ring-2 focus:ring-blue-300"
        />
        {errors?.name && (
          <p className="text-red-500 block text-xs md:text-sm">
            {errors?.name?.message}
          </p>
        )}
        <label className="block font-normal text-sm md:text-base lg:text-lg">
          Email:
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="w-full p-2 rounded-md bg-amber-50 outline-none font-normal text-sm md:text-base focus:ring-2 focus:ring-blue-300"
        />
        {errors?.email && (
          <p className="text-red-500 block text-xs md:text-sm">
            {errors?.email?.message}
          </p>
        )}
        <label className="block font-normal text-sm md:text-base lg:text-lg">
          Password:
        </label>
        <div className="relative w-full">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-2 rounded-md bg-amber-50 outline-none font-normal text-sm md:text-base focus:ring-2 focus:ring-blue-300 pr-10"
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
        <label className="block font-normal text-sm md:text-base lg:text-lg">
          Confirm Password:
        </label>
        <div className="relative w-full">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="w-full p-2 rounded-md bg-amber-50 outline-none font-normal text-sm md:text-base focus:ring-2 focus:ring-blue-300 pr-10"
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
        <label
          htmlFor="role"
          className="block font-normal text-sm md:text-base lg:text-lg"
        >
          Select Role:
        </label>
        <select
          id="role"
          {...register("role")}
          className="w-full p-2 px-2 rounded-md bg-amber-50 outline-none font-normal text-sm md:text-base focus:ring-2 focus:ring-blue-300"
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        {errors?.role && <p className="text-red-500 block text-xs md:text-sm">{errors?.role?.message}</p>}
        <button
          className={`mt-6 w-full bg-blue-500 text-white font-normal text-sm md:text-base lg:text-lg p-2 rounded-md hover:bg-blue-600 transition-colors ${
            isSubmitting ? "opacity-50" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
        <p className="text-text-color font-normal text-sm md:text-base pt-2 md:pt-4">
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className=" text-sm md:text-base font-semibold text-blue-600 hover:underline"
          >
            Sign In.
          </Link>
        </p>
      </form>
    </div>
  );
}
