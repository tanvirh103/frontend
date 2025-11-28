"use server";

import { appConfig } from "@/config/app.config";
import { getFetch } from "@/config/getFetch";
import { signInResponse } from "@/lib/type";
import { revalidateTag } from "next/cache";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export const getUserById = async (userId: string) => {
  const res = await getFetch({
    url: `user/${userId}`,
    method: "get",
    tags: ["user"],
  });
  return res.data;
};

export const signInUser = async (body: any) => {
  const res: signInResponse = await getFetch({
    url: "auth/login",
    method: "post",
    body,
  });
  if (
    typeof res.data === "object" &&
    res?.data?.token &&
    res?.data?.user &&
    res?.data?.role &&
    res?.data?.expires
  ) {
    const { token, user, role, expires } = res.data;
    (await cookies()).set(appConfig.AUTH_COOKIE_KEY, token, {
      httpOnly: false,
      path: "/",
      maxAge: expires,
    });

    (await cookies()).set(
      appConfig.AUTH_USER_COOKIE,
      JSON.stringify({ user, role }),
      {
        httpOnly: false,
        path: "/",
        maxAge: expires,
      }
    );
    updateTag("user");
  }
  return res.data;
};

export const createUser = async (body: any) => {
  const res = await getFetch({
    url: `auth/create`,
    method: "post",
    body,
  });
  return res.data;
};

export const updateUserInfo = async (userId: string, body: any) => {
  const res = await getFetch({
    url: `auth/profile/${userId}`,
    method: "put",
    body,
  });
  updateTag("user");
  return res.data;
};

export const updateUserPassword = async (userId: string, body: any) => {
  const res = await getFetch({
    url: `auth/password/${userId}`,
    method: "patch",
    body,
  });
  return res.data;
};

export const getAllJobPosts = async () => {
  const res = await getFetch({
    url: "jobs",
    method: "get",
    tags: ["jobs"],
  });
  return res.data;
};

export const getJobsByEmployer = async (employerId: string) => {
  const res = await getFetch({
    url: `jobs/employer/${employerId}`,
    method: "get",
    tags: ["jobs_by_employer"],
  });
  return res.data;
};

export const createJobPost = async (body: any) => {
  const res = await getFetch({
    url: "jobs",
    method: "post",
    body,
  });
  revalidateTag("jobs", "max");
  revalidateTag("jobs_by_employer", "max");
  return res.data;
};

export const updateJobPost = async (jobId: string, body: any) => {
  const res = await getFetch({
    url: `jobs/${jobId}`,
    method: "put",
    body,
  });
  updateTag("jobs");
  updateTag("jobs_by_employer");
  return res.data;
};

export async function logOut() {
  const cookieStore = await cookies();

  const cookieKeys = [appConfig.AUTH_COOKIE_KEY, appConfig.AUTH_USER_COOKIE];
  for (const key of cookieKeys) {
    const hasCookie = cookieStore.get(key);
    if (hasCookie) {
      cookieStore.delete(key);
    }
  }
  return { message: "Logout success" };
}

export const deleteJobPost = async (jobId: string) => {
  const res = await getFetch({
    url: `jobs/${jobId}`,
    method: "delete",
  });
  updateTag("jobs");
  updateTag("jobs_by_employer");
  return res.data;
};

export const updateStatus = async (jobId: string) => {
  const res = await getFetch({
    url: `jobs/status/${jobId}`,
    method: "patch",
  });
  updateTag("jobs");
  updateTag("jobs_by_employer");
  return res;
};


export const getAllUser=async()=>{
  const res=await getFetch({
    url:`users/`,
    method:"get",
    tags:["all_users"],
  });
  return res.data;
}


export const toggleUserStatus = async (userId: string) => {
  const res = await getFetch({
    url: `users/block/${userId}`,
    method: "patch",
  });
  updateTag("all_users");
  return res;
};


export const toggleUserApproval = async (userId: string) => {
  const res = await getFetch({
    url: `users/approve/${userId}`,
    method: "patch",
  });
  updateTag("all_users");
  return res;
};


export const applyForJob = async (jobId: string) => {
  const res = await getFetch({
    url: `apply/${jobId}`,
    method: "post",
  });
    updateTag("jobs");
  updateTag("jobs_by_employer");

  return res.data;
};

export const isApplied = async (jobId: string) => {
  const res = await getFetch({
    url: `applications/check/${jobId}`,
    method: "get",
  });
  return res.data;
}