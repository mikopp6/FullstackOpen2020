import React from "react";

interface TotalProps {
  courseParts: Array<{name: string; exerciseCount: number}>;
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total