"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MainSection() {
  const [text, setText] = useState("");
  const [retext, setRetext] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const handlePostData = () => {
    const postData = {
      model: "shuttle-2-turbo",
      messages: [
        {
          role: "user",
          content: `Rephrase the given text, correcting any grammatical errors and using simple, 
          clear language. Avoid jargon and ensure the original meaning and conversational tone 
          are maintained. Do not write anything else, only provide the rephrased content, 
          and do not include any additional explanations or statements: ${text}`,
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

  useEffect(() => {
    if (text.length > 0) {
      setIsButtonEnabled(true);
    }
  });

  return (
    <main className="flex flex-col w-full h-[50rem] items-center">
      <div className="flex flex-col items-center justify-center lg:w-full w-[85%] h-64 lg:max-w-[35rem] md:max-w-[35rem] max-w-full">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          ReText AI: Your Go-To Paraphrasing Tool
        </h1>
        <p className="text-center lg:text-[16px] text-[14px] leading-7">
          Welcome to ReText AI, the ultimate tool for transforming your text
          into clear, concise, and error-free.
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex lg:flex-row md:flex-row gap-4 lg:max-w-[60%] md:max-w-[80%] flex-col w-full items-center">
          <div className="flex flex-col lg:w-[50%] md:w-[50%] w-[70%]">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-1">
              Sad text😔
            </h3>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="lg:h-[30rem] md:h-[30rem] h-[15rem] resize-none focus-visible:ring-[none] hover:border-foreground focus:border-foreground duration-300 ease-in-out"
            ></Textarea>
          </div>
          <div className="flex flex-col lg:w-[50%] md:w-[50%] w-[70%]">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-1">
              ReTexted!🤩
            </h3>
            <Textarea
              value={retext}
              readOnly
              className="lg:h-[30rem] md:h-[30rem] h-[15rem] resize-none focus-visible:ring-[none]"
            ></Textarea>
          </div>
        </div>
        <div className="mt-4">
          {!isButtonEnabled ? (
            <Button
              onClick={handlePostData}
              disabled
              className="cursor-not-allowed"
            >
              ReText It!
            </Button>
          ) : (
            <Button onClick={handlePostData}>ReText It!</Button>
          )}
        </div>
      </div>
    </main>
  );
}
