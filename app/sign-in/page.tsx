"use client";

import { ShowPassIcon } from "@/svg/authSvg";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { signInSchema } from "./action";
import z from "zod";
import toast from "react-hot-toast";
import { signInUser } from "@/resource/index.service";

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const toastId = toast.loading("Logging In...");
    const response = await signInUser(data);
    if (typeof response === "string"|| typeof response ==="undefined") {
      toast.error(response?? "An error occurred while processing your request",{ id: toastId });
    } else {
      toast.success("SignIn successfull",{ id: toastId });
      reset();
      window.location.href = "/";
    }
  };


  return (
    <div className="container mx-auto px-3 md:px-0 -mt-16 h-screen w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-blue-50 rounded-2xl  shadow-md px-2 py-4 md:px-4 w-full max-w-lg">
        <label className="block mb-2 font-normal text-sm md:text-base lg:text-lg">
          Email:
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 rounded-md bg-amber-50 outline-none font-normal text-sm md:text-base focus:ring-2 focus:ring-blue-300"
          {...register("email")}
        />
         {errors?.email && <p className="text-red-500 block text-xs md:text-sm">{errors?.email?.message}</p>}
        <label className="block mb-2 font-normal text-sm md:text-base lg:text-lg">
          Password:
        </label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-2 rounded-md bg-amber-50 outline-none font-normal text-sm md:text-base focus:ring-2 focus:ring-blue-300 pr-10"
            {...register("password")}
          />
          <ShowPassIcon
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        </div>
         {errors?.password && <p className="text-red-500 block text-xs md:text-sm">{errors?.password?.message}</p>}
        <button className={`mt-6 w-full bg-blue-500 text-white font-normal text-sm md:text-base lg:text-lg p-2 rounded-md hover:bg-blue-600 transition-colors ${isSubmitting ? "opacity-50" : ""}`} disabled={isSubmitting} >
          {isSubmitting ? "Loging In..." : "Log In"}
        </button>
        <p className="text-text-color font-normal text-sm md:text-base pt-2 md:pt-4">
          Want to be our member?{" "}
          <Link
            href={"/sign-up"}
            className=" text-sm md:text-base font-semibold text-blue-600 hover:underline"
          >
            Create Your Account.
          </Link>
        </p>
      </form>
    </div>
  );
}
