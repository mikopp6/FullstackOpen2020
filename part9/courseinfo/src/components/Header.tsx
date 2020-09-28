import React from "react";

const Header: React.FC<{ name: string }> = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

export default Header