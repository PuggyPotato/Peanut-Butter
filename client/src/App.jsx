import { useEffect, useRef, useState } from "react"
import {useEventListener} from "usehooks-ts"





function App(){

  const [userInput,setUserInput] = useState("");
  const [timeCount,setTimeCount] = useState(0);
  const [dialogueCount,setDialogueCount] = useState(0);
  const [afterOpeningDialogue,setAfterOpeningDialogue] = useState(false);
  const [timerStarted,setTimerStarted] = useState(false);
  const timeStarted = useRef(false)
  const afterDialogue = useRef(false)

  const [userTurn,setUserTurn] = useState(false);
  const totalTime = 60;
  const openingDialogue = ["Steve:Im Starving.....I Wanna Eat.....",
                           "Narrator:You Need To Provide Instruction To Make The Peanut Butter Bread And Help Steve Eat It",
                           "Narrator:Every Random Command You Give Makes Him Starve More",
                           "Narrator:Remember....Provide Accurate Instructions..."]
  const [dialogue,setDialogue] = useState(openingDialogue[0]);
  const [timeLeft,setTimeLeft] = useState("60s");

  useEventListener("keydown",handlekeydown)

    

  function continueDialogue(event){
    if(dialogueCount <=3){
      setDialogueCount(dialogueCount + 1)
      console.log(dialogueCount)
      setDialogue(openingDialogue[dialogueCount + 1])
      if(dialogueCount === 3){
        setDialogue("");
        setUserTurn(true);
        if(timeStarted.current === false){
          startTimer();
          timeStarted.current = true;
        }
        return;
        
      }
    }
    
  }

  function submitInstruction(){
    setUserInput("")
    setUserTurn(false);
  }

  function handlekeydown(event){
    if(event.key == "Enter"){
      if(dialogueCount <= 3 && userTurn == false){
        continueDialogue();
        return
      }
      if(userTurn == true){
      submitInstruction();
      console.log("Test");
      }
      if(userTurn == false){
        returnAnswer();
      }
    }
    
  }

  function returnAnswer(){
    console.log("TEST")
    setUserTurn(true)
  }
  
  

  function startTimer(){
    let i = 0;
     const interval = setInterval(() => {
        i++
        console.log(i)
        setTimeLeft(60 - i + "s")
        if(i == totalTime){
          clearInterval(interval);
          alert("Steve Starved To Death!");
        }
     }, 1000);
  
    }



  return(
    <>
      <div className="">
          <div id="dialogueBox" className="border-2 w-[85%] h-[30%] absolute bottom-[10%] left-[8%] rounded-lg">
              <textarea className={`border-2 w-[100%] h-[100%] rounded-lg px-1 text-2xl px-2 overflow-y-hidden bg-slate-300 ${userTurn ? "" : "pointer-events-none hidden"}`} readOnly={userTurn ? false:true}
                        value={userInput} onChange={(e) =>setUserInput(e.target.value)}
                        placeholder="Enter Your Instructions..."
                        maxLength={300}>

              </textarea>
              <button 
              className={`border-2 absolute bottom-2 right-2 ${userTurn ? "" : "hidden"} cursor-pointer`}
              onClick={submitInstruction}>Enter</button>
              <div readOnly id="dialogue" className="typing-effect pointer-events-none absolute border-2 bottom-[0%] left-[0%] w-[100%] h-[100%] text-2xl px-2 py-1">
                {dialogue}</div>
              <button 
              className={`border-2 absolute bottom-2 right-2 ${userTurn ? "hidden" : ""} cursor-pointer`}
              onClick={continueDialogue}>Click to Continue</button>
          </div>
          <div className="border-2 h-30 w-30 rounded-full absolute top-10 right-20">
              <p className="absolute top-32 right-10 text-xl">{timeLeft}</p>
          </div>
      </div>
    </>
  )
}

export default App