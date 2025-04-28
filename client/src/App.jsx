import { useState } from "react"





function App(){

  const [userInput,setUserInput] = useState("");
  const [timeCount,setTimeCount] = useState(0);

  const [userTurn,setUserTurn] = useState(true);
  

  function continueDialogue(event){
    setUserTurn(true);
  }

  function submitInstruction(){
    setUserInput("")
    setUserTurn(false);
  }



  return(
    <>
      <div className="">
          <div id="dialogueBox" className="border-2 w-[85%] h-[30%] absolute bottom-[10%] left-[8%] rounded-lg">
              <textarea className={`border-2 w-[100%] h-[100%] rounded-lg px-1 text-xl ${userTurn ? "" : "pointer-events-none"}`} readOnly={userTurn ? false:true}
                        value={userInput} onChange={(e) =>setUserInput(e.target.value)}>

              </textarea>
              <button 
              className={`border-2 absolute bottom-2 right-2 ${userTurn ? "" : "hidden"} cursor-pointer`}
              onClick={submitInstruction}>Enter</button>
              <textarea readOnly id="dialogue pointer-events-none"></textarea>
              <button 
              className={`border-2 absolute bottom-2 right-2 ${userTurn ? "hidden" : ""} cursor-pointer`}
              onClick={continueDialogue}>Click to Continue</button>
          </div>
      </div>
    </>
  )
}

export default App