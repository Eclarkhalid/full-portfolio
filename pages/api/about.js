import { mongooseConnect } from "@/lib/mongoose";
import { About } from "@/models/About";

export default async function handle(req, res) {
  const {method} = req;

  await mongooseConnect();

  if (method === 'POST') {
    const { aboutValue} = req.body;

    const aboutDoc = await About.create({
      aboutValue
    })
    res.json(aboutDoc)
  }

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await About.findOne({_id: req.query.id}));
    } else {
      res.json(await About.find())
    }
  }

  if (method === 'PUT') {
    const {_id, aboutValue} = req.body;
    await About.updateOne({_id}, {
      aboutValue
    });
    res.json(true)
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await About.deleteOne({_id:req.query?.id})
      res.json(true)
    }
  }
}