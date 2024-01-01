import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  const { toast } = useToast();

  useEffect(() => {
    axios.get('/api/projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  function goBack() {
    router.push('/projects')
  }

  async function deleteProject(id) {
    await axios.delete(`/api/projects?id=${id}`);
    toast({
      variant: "destructive",
      description: "Project has been deleted.",

    })
    goBack();
    window.location.reload();
  }

  return <>
    <div className="flex justify-between items-center p-2 border-b sticky z-50 bg-white top-0">
      <h1 className="font-bold text-lg">
        All Projects
      </h1>
      <Button>
        <Link href={'/projects/new'}>
          Create Project
        </Link>
      </Button>
    </div>

    {projects.length === 0 ? (
      <div className="">
        No projects
      </div>
    ) : (
      <>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-y-auto">
          <div className="border shadow-sm rounded-lg p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Project</TableHead>
                  <TableHead className="min-w-[150px]">Technologies Used</TableHead>
                  <TableHead className="hidden md:table-cell">Completion Date</TableHead>
                  <TableHead className="text-right">Live Project</TableHead>
                  <TableHead className="hidden sm:table-cell">Source Code</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              {projects.slice().reverse().map(project => (
                <TableBody key={project._id}>
                  <TableRow>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.technologies}</TableCell>
                    <TableCell className="hidden md:table-cell">{project.date}</TableCell>
                    <TableCell className="text-right">
                      <Link href={project.projectUrl}>Visit</Link>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Link href={project.gitUrl}>Github</Link>
                    </TableCell>
                    <TableCell className="text-right">
                            <Link href={'/projects/edit/' + project._id}>
                              Edit 
                            </Link>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger className="text-sm text-red-600 px-2">
                          Delete
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant='destructive' onClick={() => deleteProject(project._id)}>Confirm Delete</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </div>
        </main></>
    )}
  </>
}