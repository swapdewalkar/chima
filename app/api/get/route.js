import { NextResponse } from "next/server"

export async function GET(request) {
  const offset = request.nextUrl.searchParams.get('offset');
	const url = 'https://api.synthesia.io/v2/videos?limit=20&offset='+offset;
	const options={
		method: 'GET',
		headers: {accept: 'application/json', Authorization:  process.env.DATA_API_KEY?.toString()}
	}  
  const resp = await fetch(url, options)
  const json = await resp.json()
  return NextResponse.json(json, { status: 200 })
}

