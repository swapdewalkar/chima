'use client'
import React, { useEffect } from 'react'

const ViewVideo = () => {

  const [id, setId] = React.useState("");
  const [url, setURL] = React.useState("");
  const handle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = e.currentTarget.elements.namedItem('id')?.value;
    setId(id);
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
      <label>Video Id: </label><br/>
      <input type='text' name='id' className="input input-accent" placeholder="Type here" />
      <button className='btn btn-primary' >View</button>
    </form>
    {url &&
      <div>
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