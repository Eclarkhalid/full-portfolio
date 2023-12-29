import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

export default function Projects() {
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
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Portfolio Website</TableCell>
              <TableCell>React, Tailwind CSS</TableCell>
              <TableCell className="hidden md:table-cell">February 20, 2023</TableCell>
              <TableCell className="text-right">
                <Link href="#">Visit</Link>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Link href="#">Github</Link>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View project</DropdownMenuItem>
                    <DropdownMenuItem className='text-red-600'>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  </>
}