import ProjectForm from "@/components/ProjectForm";

export default function NewProject() {
  return <>
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40" >
        <h1 className="font-semibold text-lg mb-4">Add New Project</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-y-auto">
        <ProjectForm />
      </main>
    </div>
  </>
}