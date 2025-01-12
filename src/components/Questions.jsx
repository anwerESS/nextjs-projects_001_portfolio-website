"use client";

import Heading from "@/components/sub/Heading";
import Question from "@/components/sub/Question";
import { questions } from "@/assets";

const Questions = () => {
  return (
    <div id="questions" className="py-20">
      <Heading text={"Questions & Answers"} />
      <div>
        <ul className="flex flex-col gap-y-3">
          {questions.map((question, i) => (
            <Question key={i} data={question} index={i} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Questions;
