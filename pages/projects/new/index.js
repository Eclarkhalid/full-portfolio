import ProjectForm from "@/components/ProjectForm";

export default function NewProject() {
  return <>
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-2 border-b sticky z-50 bg-white top-0">
        <h1 className="font-bold text-lg">
          Add a new Project
        </h1>
        <p>Fill all fields before saving</p>
      </div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-y-auto">
        <ProjectForm />
      </main>
    </div>
  </>
}