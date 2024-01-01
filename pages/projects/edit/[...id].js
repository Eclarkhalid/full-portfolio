import ProjectForm from "@/components/ProjectForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProject() {
  const [projectInfo, setProjectInfo] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return null;
    }
    axios.get('/api/projects?id=' + id).then(response => setProjectInfo(response.data));
  }, [id])
  return <>
    <div className="flex flex-col">
    <div className="flex justify-between items-center p-2 border-b sticky z-50 bg-white top-0">
    <h1 className="font-bold text-lg">
        Editing
      </h1>
      <p>
        {projectInfo?.title}
      </p>
    </div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-y-auto">
        {projectInfo && (
          <ProjectForm {...projectInfo} />
        )}
      </main>
    </div>
  </>
}