import React from "react";
import { Button } from "@mui/material";

function Day1() {
  return (
    <>
      <div className="mt-10 ml-10 justify-center" >
        <h1>Buttons</h1>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </div>
    </>
  );
}

export default Day1;
