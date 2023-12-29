import EditorPage from "@/components/Editor";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditAbout() {
  const [aboutInfo, setAboutInfo] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if(!id) {
      return null;
    }
    axios.get('/api/about?id=' + id).then(response => setAboutInfo(response.data));
  }, [id])
  return <>
    {aboutInfo && (
      <EditorPage {...aboutInfo} />
    )}
  </>
}