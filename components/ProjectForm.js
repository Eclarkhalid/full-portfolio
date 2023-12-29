import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ProjectForm({
  _id,
  title: existingTitle,
  details: existingDetails,
  image: existingImage,
  technologies: existingTechnologies,
  date: existingDate,
  projectUrl: existingProjectUrl,
  gitUrl: existingGitUrl
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [details, setDetails] = useState(existingDetails || '');
  const [image, setImage] = useState(existingImage || []);
  const [technologies, setTechnologies] = useState(existingTechnologies || '');
  const [date, setDate] = useState(existingDate || '');
  const [projectUrl, setProjectUrl] = useState(existingProjectUrl || '');
  const [gitUrl, setGitUrl] = useState(existingGitUrl || '');

  return <>
    <div className="border shadow-sm rounded-lg p-2">

      <form className="flex flex-col gap-4">
        <label className="text-lg font-medium mb-2">
          Project Name:
          <Input required
            className="bg-white p-2 rounded border mt-2 shadow-sm w-full"
            placeholder="Enter project name"
            type="text"
            value={title}
            onchange={ev => setTitle(ev.target.value)}
          />
        </label>
        <label className="text-lg font-medium mb-2">
          Project Details:
          <Textarea
            className="bg-white p-2 rounded border mt-2 shadow-sm w-full"
            placeholder="Type your message here."
            rows={5}
            value={details}
            onchange={ev => setDetails(ev.target.value)}
          />
        </label>
        <label className="text-lg font-medium mb-2">
          Project Image:
          <Input required id="picture" type="file"
            className="bg-white p-2 rounded border mt-2 shadow-sm w-full"
            value={image}
            onchange={ev => setImage(ev.target.value)}
          />
        </label>
        <label className="text-lg font-medium mb-2">
          Technologies Used:
          <Input required
            className="bg-white p-2 rounded border mt-2 shadow-sm w-full"
            placeholder="Enter technologies used"
            type="text"
            value={technologies}
            onchange={ev => setTechnologies(ev.target.value)}
          />
        </label>
        <label className="text-lg font-medium mb-2">
          Completion Date:
          <Input required className="bg-white p-2 rounded border mt-2 shadow-sm w-full" type="date" 
          value={date}
          onchange={ev => setDate(ev.target.value)}
          />
        </label>
        <label className="text-lg font-medium mb-2">
          Live Project URL:
          <Input required
            className="bg-white p-2 rounded border mt-2 shadow-sm w-full"
            placeholder="Enter live project URL"
            type="text"
            value={projectUrl}
            onchange={ev => setProjectUrl(ev.target.value)}
          />
        </label>
        <label className="text-lg font-medium mb-2">
          Source Code URL:
          <Input required
            className="bg-white p-2 rounded border mt-2 shadow-sm w-full"
            placeholder="Enter source code URL"
            type="text"
            value={gitUrl}
            onchange={ev => setGitUrl(ev.target.value)}
          />
        </label>
        <Button>
          Add project
        </Button>
      </form>
    </div>
  </>
}