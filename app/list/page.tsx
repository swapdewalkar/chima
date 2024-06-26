'use client';
import React, { useEffect } from 'react'
import { useState } from 'react'
interface Video{
	id: number;
	title: string;
	download: string;
	duration: string;
	status: string;
	visibility: string;
	lastUpdatedAt: number;
}

const ListVideo = () => {
	const [offset, setOffset] = useState(0);
	const [videos, setVideos] = useState([] as Video[]);
	useEffect(() => {
		fetch('/api/get?offset='+offset,{method: 'GET'})
								.then((res) => res.json())
								.then((data) => setVideos(data['videos']))
								.catch((err) => console.log(err));
	}, [offset])

	return (
		<>
			<div>
				<div className=" flex">
					<div className="flex-left">
						<button className="btn btn-accent w-90" onClick={()=>setOffset(offset-1)}>Previous</button>
					</div>
					<div className="flex-right">
						<button className="btn btn-accent ml-3" onClick={()=>setOffset(offset+1)}>Next</button>
					</div>
				</div>
				<table className="table table-zebra">
					<thead>
						<tr>
							<th>Id</th>
							<th>Title</th>
							<th>Download</th>
							<th>Duration</th>
							<th>Status</th>
							<th>Visibility</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						{videos.map((video) => (
							<tr key={video.id}>
							<td>{video.id}</td>
							<td>{video.title}</td>
							<td><a href={video.download} target="_blank">Download</a></td>
							<td>{video.duration}</td>
							<td>{video.status}</td>
							<td>{video.visibility}</td>
							<td>{new Date(video.lastUpdatedAt*1000).toDateString()}</td>
						</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
		
	)
}

export default ListVideo