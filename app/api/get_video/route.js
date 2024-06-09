import { NextResponse } from "next/server"

export async function GET(request) {
  	const id = request.nextUrl.searchParams.get('id');
	const url = 'https://api.synthesia.io/v2/videos/'+id;
	const options={
		method: 'GET',
		headers: {accept: 'application/json', Authorization:  process.env.DATA_API_KEY?.toString()}
		}  
	const resp = await fetch(url, options)
	const json = await resp.json()
	return NextResponse.json(json, { status: 200 })
}

