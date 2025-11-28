import ChangePasswordForm from "@/components/profile/changePasswordForm";
import UpdateForm from "@/components/profile/updateForm";
import { getUserById } from "@/resource/index.service";

export default async function Profile({ params }: { params: any }) {
  const { id } = await params;
  const user = await getUserById(id).catch((error) => {
    console.log(error);
  });

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-3 md:px-0 mt-8 w-full h-full ">
      <div className="w-full">
        <div className="bg-blue-50 rounded-2xl shadow-md p-6 h-full">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <p className="mb-2">
            <span className="font-medium">Name:</span> {user?.name ?? "N/A"}
          </p>
          <p className="mb-2">
            <span className="font-medium">Email:</span> {user?.email ?? "N/A"}
          </p>
          <p className="mb-2">
            <span className="font-medium">Role:</span> {user?.role ?? "N/A"}
          </p>
          <p className="mb-2">
            <span className="font-medium">Bio:</span> {user?.bio ?? "N/A"}
          </p>
          <p className="mb-2">
            <span className="font-medium truncate">Resume Url:</span>{" "}
            {user?.resume?.length === 0 ? "N/A" : user?.resume}
          </p>
          <p className="mb-2">
            <span className="font-medium">Experience:</span>{" "}
            {user?.experience ?? "N/A"}
          </p>
          <div>
            <span className="font-medium">Skills:</span>{" "}
            {user?.skills && user.skills.length > 0
              ? user.skills.join(", ")
              : "N/A"}
          </div>
        </div>
      </div>
      <UpdateForm user={user} />
      <ChangePasswordForm userId={user?._id}/>
    </div>
  );
}
