"use client";
import toast from "react-hot-toast";
import ToggleSwitch from "../toggle";
import { toggleUserApproval, toggleUserStatus, updateStatus } from "@/resource/index.service";

export default function UserTable({ allUsers }: any) {
  const handleUpdateStatus = async (userId: string) => {
    const res = await toggleUserStatus(userId);
    if (typeof res === "string" || typeof res === "undefined") {
      toast.error(res ?? "An error occurred while processing your request");
    } else {
      toast.success("User status updated successfully");
    }
  };
  const handleIsApproved = async (userId: string) => {
    const res = await toggleUserApproval(userId);
    if (typeof res === "string" || typeof res === "undefined") {
      toast.error(res ?? "An error occurred while processing your request");
    } else {
      toast.success("User approval status updated successfully");
    }
  };
  return (
    <tbody>
      {allUsers && allUsers.length > 0 ? (
        allUsers.map((user: any, index: number) => (
          <tr
            key={user._id}
            className={`border-b last:border-b-0 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-emerald-100 transition`}
          >
            <td className="py-3 px-4 text-sm text-gray-800">{user._id}</td>

            <td className="py-3 px-4 text-sm font-medium text-emerald-700">
              {user.name}
            </td>

            <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>

            <td className="py-3 px-4 text-sm text-gray-800">{user.role}</td>

            <td className="py-3 px-4 text-sm">
              <ToggleSwitch
                isChecked={user?.isApproved === true ? true : false}
                setIsChecked={() => handleIsApproved(user._id)}
              />
            </td>

            <td className="py-3 px-4 text-sm flex gap-2">
              <ToggleSwitch
                isChecked={user?.isBlocked === true ? true : false}
                setIsChecked={() => handleUpdateStatus(user._id)}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={6}
            className="text-center py-6 text-gray-600 text-sm bg-gray-50"
          >
            No users found
          </td>
        </tr>
      )}
    </tbody>
  );
}
