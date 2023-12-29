import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Sign from '@/components/Sign'
import { useRouter } from 'next/router'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'


export default function Home() {
  const { data: session } = useSession();
  const [about, setAbout] = useState([]);

  const { toast } = useToast();

  const [skillTitle, setTitle] = useState('');
  const [skillDescription, setSkillDescription] = useState('');

  useEffect(() => {
    axios.get('/api/about').then(response => {
      setAbout(response.data)
    })
  });

  const hasAboutData = about && about.length > 0;


  // delete about
  const router = useRouter();
  const { id } = router.query;

  function goBack() {
    router.push('/');
  }

  async function deleteAbout(id) {
    try {
      await axios.delete(`/api/about?id=${id}`);
      // Refresh the about content after deletion
      toast({
        variant: "destructive",
        description: "About has been deleted.",

      })
      goBack();
    } catch (error) {
      console.error('Error deleting about:', error);
    }
  }


  if (session) {
    return <>
      <div className="flex justify-between items-center p-2 border-b sticky z-50 bg-white top-0">
        <h1 className="font-bold text-lg">
          Welcome Back, {session.user.name}
        </h1>
        <Avatar>
          <img src={session.user.image} alt="" />
        </Avatar>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="h-32 rounded-lg bg-gray-200"></div>
          <div className="h-32 rounded-lg bg-gray-200"></div>
          <div className="h-32 rounded-lg bg-gray-200"></div>
        </div>
      </div>

      <div className="my-6 p-4">
        <div className="border border-blue-200 shadow-sm rounded-lg p-2">
          <div className="flex justify-between items-center px-4">

            {hasAboutData ? (
              <>
                <h2 className="font-semibold text-lg mb-4">About Me</h2>
                <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                  {about.map((content) => (
                    <>
                      <Link key={content._id}
                        href={`/about/edit/${content._id}`}
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                      >
                        Edit
                      </Link>

                      <p
                        className="inline-block px-4 py-2 text-sm font-medium text-red-700 bg-red-100 focus:relative"
                      >
                        <Dialog>
                          <DialogTrigger>
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
                              <Button variant='destructive' onClick={() => deleteAbout(content._id)}>Confirm Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </p>
                    </>
                  ))}
                </span>
              </>
            ) : (
              <>

                <Link href={'/about/new'} class="mx-auto w-full">
                  <label class="flex w-full appearance-none items-center justify-center rounded-md border-2 border-dashed border-blue-400 p-6 transition-all hover:border-primary-300">
                    <div class="space-y-1 text-center">
                      <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-gray-500">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                      </div>
                      <div class="text-gray-600"><p class="font-medium text-primary-500 hover:text-primary-700">Click to Add details about you.</p></div>
                    </div>
                  </label>
                </Link>

              </>
            )}
          </div>
          {about.map((content) => (
            <div key={content.id} className="text-md text-gray-600 px-4 h-30">
              <div dangerouslySetInnerHTML={{ __html: content.aboutValue }} />
            </div>
          ))}

        </div>
      </div>
      <div className="my-6 p-4">
        <div className="border border-blue-200 shadow-sm rounded-lg p-2">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg mb-4">Skills</h2>
            <Dialog>
              <DialogTrigger>
                Add skill
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new skill.</DialogTitle>
                  <DialogDescription >
                    Provide a descriptive text about it.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col space-y-3">
                  <label className='font-medium'>Title</label>
                  <Input type='text' placeholder='Skill title' value={skillTitle} onchange={ev => setTitle(ev.target.value)} />
                </div>
                <div className="flex flex-col space-y-3">
                  <label className='font-medium'>Description</label>
                  <Textarea placeholder="Type your message here." value={skillDescription}
                    onchange={ev => setSkillDescription(ev.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button>
                    Save skill
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </div>
          <p className="text-md text-gray-600">
            react
          </p>
        </div>
      </div>
    </>
  }

  return <>
    <Sign />
  </>
}
