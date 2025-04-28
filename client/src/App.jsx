import { useState } from "react"





function App(){

  const [userInput,setUserInput] = useState("");
  const [timeCount,setTimeCount] = useState(0);




  return(
    <>
      <div className="">
          <div id="dialogueBox" className="border-2 w-[80%]">

          </div>
      </div>
    </>
  )
}

export default App