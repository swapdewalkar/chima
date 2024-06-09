'use client'
import React, { useState } from 'react'


const CreateVideo = () => {
  const [id, setId] = useState("")
  const [fetching, setFetching] = useState(false)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetching(true);
    const form = new FormData(e.currentTarget)
    const title = form.get('title');
    const product = form.get('product');
    const company = form.get('company');
    const profile = form.get('profile');
    const data = {"title": title, "product": product, "company": company, "profile": profile};
    console.log("swapnil",data);
    fetch('/api/create',{method: 'POST', body: JSON.stringify(data)})
          .then((resp) => resp.json())
          .then((json) => {
            setId(json.id);
            setFetching(false);
          })
          .catch((err) => setId(err));
  }

  return (
    <>
    {fetching && <span className="loading loading-dots loading-lg"></span>}


    {!fetching &&
        <div className="flex justify-center flex-col">
        {id && 
        <div >
          <div role="alert" className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Created: {id}</span>
          </div>
        </div>}
        <div>
        <form onSubmit={handleSubmit}>
          <label>Title: </label><br/>
          <input type='text' name='title' className="input input-accent" placeholder="Type here" /><br/>
          <label>Product Info: </label><br/>
          <textarea placeholder="Type here" name='product' rows={5} cols={100} className="textarea textarea-accent"></textarea><br/>
          <label >Company Info:</label><br/>
          <textarea placeholder="Type here" name="company" rows={5} cols={100} className="textarea textarea-accent"></textarea><br/>
          <label>Target Profile:</label><br/>
          <textarea placeholder="Type here" name="profile" rows={5} cols={100} className="textarea textarea-accent"></textarea><br/>
          <div className="flex justify-center">
          <button className='btn btn-primary' >Generate</button>
          </div>
      </form>
      </div>
      </div>
      }
    </>

  )
}

export default CreateVideo