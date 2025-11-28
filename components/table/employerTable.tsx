"use client";
import { useState } from "react";
import EditJobs from "./editJob";
import DeleteJob from "./deleteJob";
import ToggleSwitch from "../toggle";
import { updateStatus } from "@/resource/index.service";
import toast from "react-hot-toast";

export default function EmployerTable({ jobs }: any) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const handleEditClick = (job: any) => {
    setSelectedJob(job);
    setShowEditModal(true);
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);
  const handleDeleteClick = (jobId: string) => {  
    setJobIdToDelete(jobId);
    setShowDeleteModal(true);
  }
  const handleUpdateStatus =async (jobId:string) => {
     const res = await updateStatus(jobId);
    if (typeof res === "string"|| typeof res ==="undefined") {
      toast.error(res?? "An error occurred while processing your request");
    } else {
      toast.success("Job post status updated successfully");
    }
  };
  return (
    <>
      <tbody>
        {jobs && jobs?.length > 0 ? (
          jobs?.map((job: any, index: number) => (
            <tr
              key={job._id}
              className={`border-b last:border-b-0 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-indigo-100 transition`}
            >
              <td className="py-3 px-4 text-sm text-gray-800">{job?._id}</td>
              <td className="py-3 px-4 text-sm font-medium text-indigo-600">
                {job?.title}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700 max-w-[260px] truncate">
                {job.description}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">{job?.company}</td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {job?.location}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleEditClick(job);
                    }}
                    title="Edit job"
                    className="inline-flex cursor-pointer items-center px-2 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9A1 1 0 016 16H3a1 1 0 01-1-1v-3a1 1 0 01.293-.707l9.9-9.9a2 2 0 012.828 0zM15 4l1 1" />
                    </svg>
                    Edit
                  </button>

                  <button
                    type="button"
                     onClick={() => {handleDeleteClick(job?._id);
                    }}
                    title="Delete job"
                    className="inline-flex cursor-pointer items-center px-2 py-1 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7 4a1 1 0 011-1h4a1 1 0 011 1v1h3a1 1 0 110 2h-1v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 110-2h3V4zm2 3a1 1 0 10-2 0v7a1 1 0 102 0V7zm4 0a1 1 0 10-2 0v7a1 1 0 102 0V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
               <td className="py-3 px-4 text-sm text-gray-800">
                 <ToggleSwitch
                  isChecked={job?.isAcceptingApplications === true ? true : false}
                  setIsChecked={() => handleUpdateStatus(job._id)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="text-center py-6 text-gray-600 text-sm bg-gray-50"
            >
              No jobs found
            </td>
          </tr>
        )}
      </tbody>
      {showEditModal && (
        <EditJobs setShow={setShowEditModal} job={selectedJob} />
      )}
      {showDeleteModal&&(
        <DeleteJob setShow={setShowDeleteModal} jobId={jobIdToDelete} />
      )}
    </>
  );
}
