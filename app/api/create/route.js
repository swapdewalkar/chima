import { NextResponse } from "next/server"

export async function POST(request) {
  const body = await request.json()
  const title = body.title;
  const product = body.product;
  const company = body.company;
  const profile = body.profile;

  const script = await fetch('http://localhost:3000/api/script', {method: 'POST', body: JSON.stringify({title: title, product: product, company: company, profile: profile})}).then((resp) => resp.json())
  const url = 'https://api.synthesia.io/v2/videos';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.DATA_API_KEY
    },
    body: JSON.stringify({
      test: 'true',
      visibility: 'public',
      title: title,
      input: [
        {
          avatarSettings: {horizontalAlign: 'center', scale: 1, style: 'rectangular', seamless: false},
          backgroundSettings: {
            videoSettings: {
              shortBackgroundContentMatchMode: 'freeze',
              longBackgroundContentMatchMode: 'trim'
            }
          },
          scriptText: script.scriptText,
          avatar: '49dc8f46-8c08-45f1-8608-57069c173827',
          background: 'off_white'
        }
      ]
    })
  };
  console.log(title, product, company, profile,url)  
  const resp = await fetch(url, options)
  const data = await resp.json()
  return NextResponse.json({ status: resp.status, id: data.id }, { status: 200 })
}
