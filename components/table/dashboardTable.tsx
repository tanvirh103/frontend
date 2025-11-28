"use client";
import { appConfig } from "@/config/app.config";
import { applyForJob, isApplied } from "@/resource/index.service";
import { getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DashboardTable({ jobs }: any) {
  const userCookie = getCookie(appConfig.AUTH_USER_COOKIE);
  const user = userCookie ? JSON.parse(userCookie) : null;
  const role = user?.role;
  const [appliedJobs, setAppliedJobs] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (role !== "jobseeker") return;
    const fetchAppliedStatus = async () => {
      const results: any = {};
      for (const job of jobs) {
        const response = await isApplied(job._id);
        console.log(response);
        results[job._id] = response?.applied ?? false;
      }
      setAppliedJobs(results);
    };
    fetchAppliedStatus();
  }, [jobs, role]);

  const handleApply = async (jobId: string) => {
    const response = await applyForJob(jobId);
    if (typeof response === "string" || typeof response === "undefined") {
      return toast.error(
        response ?? "An error occurred while processing your request"
      );
    }
    setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
    toast.success("Job applied successfully");
  };

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-linear-to-r from-indigo-500 to-purple-500 text-white">
          <th className="py-4 px-4 text-sm font-semibold">Job ID</th>
          <th className="py-4 px-4 text-sm font-semibold">Title</th>
          <th className="py-4 px-4 text-sm font-semibold">Description</th>
          <th className="py-4 px-4 text-sm font-semibold">Company</th>
          <th className="py-4 px-4 text-sm font-semibold">Location</th>
          <th className="py-4 px-4 text-sm font-semibold">Posted At</th>
          {role === "jobseeker" && (
            <th className="py-4 px-4 text-sm font-semibold">Actions</th>
          )}
        </tr>
      </thead>

      <tbody>
        {jobs && jobs?.length > 0 ? (
          jobs?.map((job: any, index: number) => (
            <tr
              key={job._id}
              className={`border-b last:border-b-0 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-indigo-100 transition`}
            >
              <td className="py-3 px-4 text-sm text-gray-800">{job._id}</td>
              <td className="py-3 px-4 text-sm font-medium text-indigo-600">
                {job.title}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700 max-w-[260px] truncate">
                {job.description}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">{job.company}</td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {job.location}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {new Date(job.createdAt).toLocaleDateString()}
              </td>
              {role === "jobseeker" && (
                <td className="py-3 px-4 text-sm text-gray-800">
                  {appliedJobs[job._id] ? (
                    <span className="px-3 py-1 text-xs rounded bg-gray-400 text-white cursor-not-allowed">
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(job._id)}
                      className="px-3 py-1 text-xs rounded bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer"
                    >
                      Apply
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={6}
              className="text-center py-6 text-gray-600 text-sm bg-gray-50"
            >
              No jobs found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
