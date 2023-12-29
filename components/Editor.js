import { useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "./ui/button";


export default function EditorPage({
  _id,
  aboutValue: existingAboutValue
}) {
  const [aboutValue, setAboutValue] = useState(existingAboutValue || '');
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handleEditorChange = (content) => {
    setAboutValue(content);
  };

  const addAbout = async (ev) => {
    ev.preventDefault();
    try {
      if (_id) {
        await axios.put('/api/about', { _id, aboutValue }); // Send _id and aboutValue directly
      } else {
        await axios.post('/api/about', { aboutValue }); // Send aboutValue for creation
      }
      setRedirect(true);
    } catch (error) {
      console.error('Error adding about:', error);
    }
  };

  if (redirect) {
    router.push('/');
    return null;
  }

  if (_id) {
    return <>
      <form onSubmit={addAbout}>
        <header className="flex justify-between items-center p-2 border-b sticky top-0 z-50">
          <h1 className="font-bold text-lg">
            Editing!
          </h1>
          <Button>
            Save Changes
          </Button>
        </header>
        <Editor
          apiKey='p20h4ku11xxpwtf1fqm8d38iguvcwpwnbe58g0b0h54boyj9'
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>Start writing by editing this text.</p>"
          value={aboutValue}
          onEditorChange={handleEditorChange}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </form>
    </>


  }

  return <>
      <form onSubmit={addAbout}>
        <header className="flex justify-between items-center p-2 border-b sticky top-0 z-50 mb-4">
          <h1 className="font-bold text-lg">
            Start Writing about you!
          </h1>
          <Button>
            Save
          </Button>
        </header>
        <Editor
          apiKey='p20h4ku11xxpwtf1fqm8d38iguvcwpwnbe58g0b0h54boyj9'
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>Start writing by editing this text.</p>"
          value={aboutValue}
          onEditorChange={handleEditorChange}
          className='border shadow-sm rounded-lg p-2 mt-6'
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </form>
  </>
}
