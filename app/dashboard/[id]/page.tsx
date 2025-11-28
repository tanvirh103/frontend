import UserTable from "@/components/table/userTable";
import { getAllUser, getUserById } from "@/resource/index.service";
import Link from "next/link";

export default async function Dashboard({ params }: { params: any }) {
  const { id } = await params;
  const user = await getUserById(id).catch((error) => {
    console.log(error);
  });
  const allUsers = await getAllUser().catch((error) => {
    console.log(error);
  });
  console.log(allUsers);
  return (
    <div className="container mx-auto gap-6 px-3 md:px-0 mt-8">
      {user.role === "employer" ? (
        <div className="max-w-lg mx-auto">
          <div className="bg-blue-50 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-medium text-center mb-4">Dashboard</h2>

            <div className=" space-y-4">
              <Link
                href={"/add-job"}
                className="bg-amber-400 font-normal text-sm md:text-base rounded-full text-center shadow-md px-4 py-2 w-full block hover:bg-amber-500"
              >
                Add new job post
              </Link>
              <Link
                href={`/existing-job/${user?._id}`}
                className="bg-emerald-400 font-normal text-sm md:text-base rounded-full text-center shadow-md px-4 py-2 w-full block hover:bg-emerald-500"
              >
                View existing job posts
              </Link>
              <Link
                href={`/profile/${user?._id}`}
                className="bg-red-400 font-normal text-sm md:text-base rounded-full text-center shadow-md px-4 py-2 w-full block hover:bg-red-500"
              >
                Manage account settings
              </Link>
            </div>
          </div>
        </div>
      ) : (
        user.role === "admin" && (
          <div className="w-full h-full">
            <table className="w-full text-left border-collapse rounded-2xl">
              <thead>
                <tr className="bg-linear-to-r from-emerald-500 to-blue-600 text-white">
                  <th className="py-4 px-4 text-sm font-semibold">User ID</th>
                  <th className="py-4 px-4 text-sm font-semibold">Name</th>
                  <th className="py-4 px-4 text-sm font-semibold">Email</th>
                  <th className="py-4 px-4 text-sm font-semibold">Role</th>
                  <th className="py-4 px-4 text-sm font-semibold">isApproved</th>
                  <th className="py-4 px-4 text-sm font-semibold">isBlocked</th>
                </tr>
              </thead>

             <UserTable allUsers={allUsers} />
            </table>
          </div>
        )
      )}
    </div>
  );
}
