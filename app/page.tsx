"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [retext, setRetext] = useState("");
  const handlePostData = () => {
    const postData = {
      model: "shuttle-2-turbo",
      messages: [
        {
          role: "user",
          content: `Rephrase the text provided below, correcting any grammatical errors and using simple, clear language. 
          Avoid jargon and ensure the original meaning and conversational tone are maintained. 
          Here is the text to be paraphrased, and please do not write anything else, just do as mentioned before, 
          i dont want my users to see anything else: ${text}`,
        },
      ],
      temperature: 0.7,
    };
    axios
      .post("https://api.shuttleai.app/v1/chat/completions", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer shuttle-af16bb43c5b0e2d9b3f4`,
        },
      })
      .then((response) => {
        // console.log(response.data.choices[0].message.content);
        let descriptionRes = response.data.choices[0].message.content;
        setRetext(descriptionRes);
      })
      .catch((error) => console.error(error));
  };

  return (
    <main className="flex w-full">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-row gap-6 max-w-[60%] w-full">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-[90rem]"
          ></Textarea>
          <Textarea value={retext} disabled></Textarea>
        </div>
        <div>
          <Button onClick={handlePostData}>Click me</Button>
        </div>
      </div>
    </main>
  );
}
