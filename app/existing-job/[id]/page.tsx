import EmployerTable from "@/components/table/employerTable";
import { getJobsByEmployer } from "@/resource/index.service";


export default async function ExistingJob({ params }: { params: any }) {
     const { id } = await params;
      const jobs = await getJobsByEmployer(id).catch((error) => {
        console.log(error);
      });
  
    return(
       <div className="container mx-auto mt-10">
      <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-200 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-linear-to-r from-indigo-500 to-purple-500 text-white">
              <th className="py-4 px-4 text-sm font-semibold">Job ID</th>
              <th className="py-4 px-4 text-sm font-semibold">Title</th>
              <th className="py-4 px-4 text-sm font-semibold">Description</th>
              <th className="py-4 px-4 text-sm font-semibold">Company</th>
              <th className="py-4 px-4 text-sm font-semibold">Location</th>
              <th className="py-4 px-4 text-sm font-semibold">Action</th>
              <th className="py-4 px-4 text-sm font-semibold">Accepting Application</th>
            </tr>
          </thead>
          <EmployerTable jobs={jobs} />
        </table>
      </div>
    </div>  
    )
}