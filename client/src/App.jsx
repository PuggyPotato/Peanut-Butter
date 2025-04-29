import { useState } from "react"





function App(){

  const [userInput,setUserInput] = useState("");
  const [timeCount,setTimeCount] = useState(0);
  const [dialogueCount,setDialogueCount] = useState(0);
  const [afterOpeningDialogue,setAfterOpeningDialogue] = useState(false);

  const [userTurn,setUserTurn] = useState(false);
  const totalTime = 60;
  const openingDialogue = ["Steve:Im Starving.....I Wanna Eat.....",
                           "Narrator:You Need To Provide Instruction To Make The Peanut Butter Bread And Help Steve Eat It",
                           "Narrator:Every Random Command You Give Makes Him Starve More",
                           "Narrator:Remember....Provide Accurate Instructions..."]
  const [dialogue,setDialogue] = useState(openingDialogue[0]);
  

  function continueDialogue(event){
    event.preventDefault();
    if(!afterOpeningDialogue){
      setDialogueCount(dialogueCount + 1)
      console.log(dialogueCount)
      setDialogue(openingDialogue[dialogueCount + 1])
      if(dialogueCount === 3){
        setAfterOpeningDialogue(true);
        setDialogue("");
        setUserTurn(true);
      }
    }
  }

  function submitInstruction(){
    setUserInput("")
    setUserTurn(false);
  }

  /*for(let i = 0;i <=totalTime;i++){
    setInterval(() => {
      console.log(i)
    }, 1000);
  }*/



  return(
    <>
      <div className="">
          <div id="dialogueBox" className="border-2 w-[85%] h-[30%] absolute bottom-[10%] left-[8%] rounded-lg">
              <textarea className={`border-2 w-[100%] h-[100%] rounded-lg px-1 text-2xl px-2 overflow-y-hidden ${userTurn ? "" : "pointer-events-none"}`} readOnly={userTurn ? false:true}
                        value={userInput} onChange={(e) =>setUserInput(e.target.value)}
                        placeholder="Enter Your Instructions..."
                        maxLength={300}>

              </textarea>
              <button 
              className={`border-2 absolute bottom-2 right-2 ${userTurn ? "" : "hidden"} cursor-pointer`}
              onClick={submitInstruction}>Enter</button>
              <textarea readOnly id="dialogue" className=" pointer-events-none absolute border-2 bottom-[0%] left-[0%] w-[100%] h-[100%]" value={dialogue}></textarea>
              <button 
              className={`border-2 absolute bottom-2 right-2 ${userTurn ? "hidden" : ""} cursor-pointer`}
              onClick={continueDialogue}>Click to Continue</button>
          </div>
      </div>
    </>
  )
}

export default App