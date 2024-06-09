'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
const ViewVideo = () => {

  const [id, setId] = React.useState("");
  const [url, setURL] = React.useState("");
  const [emails, setEmails] = React.useState("");
  const handle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget)
    const id = form.get('id')?.toString();
    if (id) setId(id);
    console.log(id);
  }

  useEffect(() => {
    if (id!=""){
      fetch('/api/get_video?id='+id,{method: 'GET'})
          .then((resp) => resp.json())
          .then((json) => {
            setURL(json.download);
            console.log(json.download)
          })
          .catch((err) => console.log(err));
    }
  }, [id])
  
  return (
    <>
    <div>
    <form onSubmit={handle}>
      <div className='flex'>
        <div className='flex-auto'>
            <label>Video Id: </label>
            <input type='text' name='id' className="input input-accent ml-5" placeholder="Type here" />
            <button className="btn btn-neutral  ml-5">View</button>
        </div>
        <div className='flex-right'>
          {url && 
          <button className="btn btn-accent">
          <a href={url} target="_blank" download>
            Download</a></button>
          }
        </div>        
        <div className='flex-right'>
          {url && 
          <>
          <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <p className="py-4">Enter emails to send the video to</p>
            <div className="modal-action">
              <form method="dialog">
                <input type="email" name="email" placeholder="Your email" className="input input-accent" />
                <button className="btn">Send</button>
              </form>
            </div>
          </div>
        </dialog>
          <button className="btn ml-2" onClick={() => {
            const model = document.getElementById('my_modal_1') as HTMLDialogElement;
            model.showModal();
          }}
          >Send Email</button>
          
          </>
          }
        </div>
      </div>
    </form>
    {url &&
      <div className='mt-3 p-3'>
        <video width="100%" height="240" controls>
          <source src={url} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>
    }
    </div>
    </>

    
  )
}

export default ViewVideo