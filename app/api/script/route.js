import { NextResponse } from "next/server"

export async function POST(request) {
    const body = await request.json()
    const title = body.title;
    const product = body.product;
    const company = body.company;
    const profile = body.profile;
    const llmtext = title + product + company + profile;

    //LLM
    // const prompt = "Create a script for video  for target audience as profile titled with " + title + " with the following prodct info: " + product+ " and company info: " + company + " and profile: " ;
    // const llmresp = await  fetch('https://api.openai.com/v1/chat/completions',{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
    //     },
    //     body: JSON.stringify({prompt: prompt, max_tokens: 50, temperature: 0.7, top_p: 1, frequency_penalty: 0.5, presence_penalty: 0.5})
    // })
    // const llmjson = await llmresp.json()
    // console.log(llmjson)
    // const llmtext = await llmjson.choices[0].text
    // console.log(llmtext)
	return NextResponse.json({scriptText: llmtext}, { status: 200 })
}

