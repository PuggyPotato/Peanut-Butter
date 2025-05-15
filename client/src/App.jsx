import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {useEventListener} from "usehooks-ts";





function App(){

  const [userInput,setUserInput] = useState("");
  const [dialogueCount,setDialogueCount] = useState(0);
  const timeStarted = useRef(false);
  const [userTurn,setUserTurn] = useState(false);
  const totalTime = 60;
  const openingDialogue = ["Steve:Im Starving.....I Wanna Eat.....",
                           "Narrator:You Need To Provide Instruction To Make The Peanut Butter Bread And Help Steve Eat It",
                           "Narrator:Every Random Command You Give Makes Him Starve More",
                           "Narrator:Remember....Provide Accurate Instructions..."];
  const [dialogue,setDialogue] = useState(openingDialogue[0]);
  const [timeLeft,setTimeLeft] = useState(60);
  const [phase1,setPhase1] = useState(false);
  const [phase2,setPhase2] = useState(false);
  const [phase3,setPhase3] = useState(false);
  const [phase4,setPhase4] = useState(false);
  const [phase5,setPhase5] = useState(false);
  const [phase6,setPhase6] = useState(false);
  const [phase7,setPhase7] = useState(false);
  const [shown,setShown] = useState(false);
  const [won,setWon] = useState(false);
  const interval = useRef(null);
  const [lost,setLost] = useState(false);

  const instruction1 = "take the bread out of the bag";
  const instruction2 = "put the bread on the table";
  const instruction3 = "open the lid of the peanut butter";
  const instruction4 = "take the knife from the table from the back";
  const instruction5 = "use the knife to scoop the peanut butter from the jar";
  const instruction6 = "spread the butter on the knife onto the bread";
  const instruction7 = "eat";

  useEventListener("keydown",handlekeydown);

    

  function continueDialogue(event){
    console.log(dialogueCount);
    if(dialogueCount <=3){
      let newCount = dialogueCount + 1;
      setDialogueCount(newCount);
      console.log(dialogueCount);
      setDialogue(openingDialogue[newCount]);
      if(dialogueCount === 3){
        setDialogue("");
        setUserTurn(true);
        if(timeStarted.current === false){
          startTimer();
          timeStarted.current = true;
          return;
        }
        
      }
    }
    else{
      returnAnswer();
    }
    
    
  }



  function submitInstruction(){
    setUserInput(userInput.toLowerCase());
    let lowerUserInput = userInput.toLowerCase();
    if(lowerUserInput == "" || null){
      setDialogue("You Didn't Enter Any Instruction.");
    }
    else{
      //Wrong Message At Phase 0
      if(!phase1 && lowerUserInput != instruction1){
        if(lowerUserInput == "take the bread"){
        setDialogue("the bread is inside the bag...You can't take it.")
        }
        else if(lowerUserInput == "eat"){
          setDialogue("You Ate The Table.You Lost.");
          setWon(false);
          setLost(true);
          clearInterval(interval.current);
          setTimeout(() => {
            endScreen();
          }, 3000);
        }
        else{ 
          setDialogue("You Don't Know How To Do That ")
        }
      }
      //Correct Message At Phase 1
      if(lowerUserInput == instruction1){
        setPhase1(true);
        setDialogue("You Took The Bread Out Of The Bag.")
      }


      if(phase1 && lowerUserInput != instruction2){
        //Message At Phase 1 (Wrong)
        if(!phase1 && lowerUserInput == "eat"){
          setDialogue("You ate the Bread.You Lost.")
          setWon(false);
          setLost(true);
          clearInterval(interval.current);
          setTimeout(() => {
            endScreen();
          }, 3000);
        }
        else{
          setDialogue("You Don't Know How To Do That.")
        }
      }

      if(lowerUserInput == instruction2 && phase1 == true){
        setPhase2(true);
        setDialogue("You put the bread on the table.")
      }

      if(phase2 && lowerUserInput != instruction3){
        //Message At Phase 2 (Wrong)
        if(lowerUserInput == "eat"){
          setDialogue("You Ate The Bread.You Lost!")
          setWon(false);
          setLost(true);
          clearInterval(interval.current);  
          setTimeout(() => {
            endScreen();
          }, 3000);
        }
      }
      if(lowerUserInput == instruction3 && phase2 == true){
        setPhase3(true);
        setDialogue("You Opened The Lid Of The Peanut Butter.")
      }
      if(phase3 && lowerUserInput != instruction4){
        //Message At Phase 3 (Wrong)
        if(lowerUserInput == "eat"){
          setDialogue("You Ate The Peanut Butter. You Lost.");
          setWon(false);
          setLost(true);
          clearInterval(interval.current);
          setTimeout(() => {
            endScreen();
          }, 3000);
        }
      }

      if(lowerUserInput == instruction4 && phase3 == true){
        setPhase4(true);
        setDialogue("You Took The Knife From The Table Safely.");
      }
      if(phase4 && lowerUserInput !=instruction5){
        //Message At Phase 4 (Wrong)
        if(lowerUserInput == "eat"){
          setDialogue("You Ate The Jar.You Lost.");
          setWon(false);
          setLost(true);
          clearInterval(interval.current);
          setTimeout(() => {
            endScreen();
          }, 3000);
        }
      }
      if(lowerUserInput == instruction5 && phase4 == true){
        setPhase5(true);
        setDialogue("The Butter Is Now On The Knife.")
      }
      if(phase5 && lowerUserInput != instruction6){
        //Message At Phase 5 (Wrong)
        if(lowerUserInput == "eat"){
          setDialogue("You Ate The Knife.You Died.");
          setWon(false);
          setLost(true);
          clearInterval(interval.current);
          setTimeout(() => {
            endScreen();
          }, 3000);
        }
      }
      if(lowerUserInput == instruction6 && phase5 == true){
        setPhase6(true);
        setDialogue("The Butter is Now On The Bread.")
      }
      if(phase6 && lowerUserInput != instruction7){
        //Message At Phase 6 (Wrong)
      }
      if(lowerUserInput == instruction7 && phase6 == true){
        setPhase7(true);
        setDialogue("You Ate The Peanut Butter Bread!You Won!")
        setTimeout(() => {
            endScreen();
            setWon(true);
            clearInterval(interval.current)
        }, 3000);
      }
    }
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
    setDialogue("")
    console.log("TEST")
    let value = true;
    setUserTurn(value)
  }
  
  function endScreen(){
    setShown(true);
  }
  

  function startTimer(){
    let i = 0;
      interval.current = setInterval(() => {
      if(userInput == instruction7 && phase6 == true){
        clearInterval(interval.current)
      }
        i++
        setTimeLeft(60 - i);
        if(i == totalTime){
          clearInterval(interval.current);
          endScreen();
        }
        if(phase6 && userInput == instruction7){
          clearInterval(interval.current)
        }
     }, 1000);
  
    }

  



  return(
    <>
      <div className="flex justify-center items-center">
        <div className={`border-2 h-[80%] w-[80%] 
                         absolute bg-slate-200 transition-all duration-500 
                         flex justify-center items-center
                         z-20 ${shown ? "top-10" : "-top-full"}`}>
            {won ? 
            <div className="w-[100%] h-[100%]">
              <h1 className="text-6xl">You Won With {timeLeft}s Left!</h1>
              <button onClick={() => window.location.reload()} className="cursor-pointer border-2 text-3xl p-2 rounded-lg absolute bottom-[10%] left-[43%] bg-green-600">Play Again!</button>

            </div> : 
            <div>
              <h1 className="text-6xl">You Lost!</h1>
              <button onClick={() => window.location.reload()} className="cursor-pointer border-2 text-3xl p-2 rounded-lg absolute bottom-[10%] left-[43%] bg-green-600">Play Again!</button>
            </div>
              }
        </div>
        <div className="border-2 absolute top-10 left-[8%] w-[24%] h-[25%]">
          <label className="text-sm pt-10 accent-lime-300"><input type="checkbox" readOnly className="mx-2 pointer-events-none" checked={phase1}/>{phase1 ? instruction1 : "???? ??? ????? ??? ?? ??? ???"}</label><br/>
          <label className="text-sm pt-10 accent-lime-300"><input type="checkbox" readOnly className="mx-2 pointer-events-none" checked={phase2}/>{phase2 ? instruction2 : "??? ??? ??? ?? ??? ?????"}</label><br/>
          <label className="text-sm pt-10 accent-lime-300"><input type="checkbox" readOnly className="mx-2 pointer-events-none" checked={phase3}/>{phase3 ? instruction3 : "???? ??? ??? ?? ??? ?????? ??????"}</label><br/>
          <label className="text-sm pt-10 accent-lime-300"><input type="checkbox" readOnly className="mx-2 pointer-events-none" checked={phase4}/>{phase4 ? instruction4 : "???? ??? ????? ???? ??? ????? ???? ??? ????"}</label><br/>
          <label className="text-sm pt-10 accent-lime-300"><input type="checkbox" readOnly className="mx-2 pointer-events-none" checked={phase5}/>{phase5 ? instruction5 : "??? ??? ????? ?? ????? ??? ?????? ?????? ???? ??? ???"}</label><br/>
          <label className="text-sm pt-10 accent-lime-300"><input type="checkbox" readOnly className="mx-2 pointer-events-none" checked={phase6}/>{phase6 ? instruction6 : "?????? ??? ?????? ?? ??? ????? ???? ??? ?????"}</label><br/>
          <label className="text-sm pt-10 accent-lime-300"><input type="checkbox" readOnly className="mx-2 pointer-events-none" checked={phase7}/>{phase7 ? instruction7 : "???"}</label>
        </div>
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
              className={`border-2 absolute bottom-2 right-2 ${userTurn ? "hidden" : ""}  ${lost ? "hidden" : ""} cursor-pointer`}
              onClick={continueDialogue}>Click to Continue</button>
          </div>
          <div className="border-2 h-30 w-30 rounded-full absolute top-10 right-20">
              <img src="/clock.png" className="h-30 w-30 rounded-full"></img>
              <p className={`absolute top-32 right-10 text-xl ${timeLeft <= 10 && "text-red-600"}`}>{timeLeft}s</p>
          </div>
      </div>
    </>
  )
}

export default App