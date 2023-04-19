import React from "react";
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";

function GetActivity(props) {
  const configuration = new Configuration({
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);

  const prompt = `What activities can i do in ${props.location} when the temperaute is ${props.temp}?`
  const prompt2 = `what to do when its ${props.weather} in ${props.location} and the temparature is ${props.temp}?`

  async function generateActivity(){
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt2,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });  
      console.log(prompt2, response.data.choices[0].text);

  }

  

  

  return <>
  <button onClick={generateActivity}>click</button>
  </>;
}

export default GetActivity;
