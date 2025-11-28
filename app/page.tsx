import DashboardTable from "@/components/table/dashboardTable";
import { getAllJobPosts } from "@/resource/index.service";
export default async function Home() {
  const jobs = await getAllJobPosts().catch((error) => {
    console.log(error);
  });
  return (
    <div className="container mx-auto mt-10">
      <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-200 bg-white">
        <DashboardTable jobs={jobs} />
      </div>
    </div>
  );
}
