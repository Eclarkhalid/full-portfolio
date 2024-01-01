import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handle(req, res) {
  const {method} = req;

  await mongooseConnect();

  if (method === 'POST') {
    const { title, details, image, technologies, date, projectUrl, gitUrl} = req.body;

    const projectDoc = await Project.create({
      title, details, image, technologies, date, projectUrl, gitUrl
    })
    res.json(projectDoc)
  }

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Project.findOne({_id: req.query.id}));
    } else {
      res.json(await Project.find())
    }
  }

  if (method === 'PUT') {
    const {_id, title, details, image, technologies, date, projectUrl, gitUrl} = req.body;
    await Project.updateOne({_id}, {
      title, details, image, technologies, date, projectUrl, gitUrl
    });
    res.json(true)
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Project.deleteOne({_id:req.query?.id})
      res.json(true)
    }
  }
}