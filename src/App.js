
import './App.css';
import { useCallback, useEffect, useState ,useRef } from 'react';

function App() {
     const [length ,setLength]=useState(8)
     const [charAllowed,setcharAllowed]=useState(false)
     const [numberAllowed,setnumberAllowed]=useState(false)
     const [password,setPassword]=useState("")
     const refarence=useRef()

      const passwordGenerator=useCallback(()=>{
      
        let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let pass=""
            if(charAllowed) str+="./';:][}{_)(*&^%$#@!~?";
            if(numberAllowed) str+="0123456789";

            for(let i=1; i<=length;i++){
               let char = Math.floor(Math.random()*str.length+1)
               pass+=str.charAt(char)
            }
            setPassword(pass)
      },[length,charAllowed,numberAllowed,setPassword])

      const copyClipBoard=useCallback(()=>{
           refarence.current?.select()
          //  refarence.current?.setSelectionRange(0,10)
           window.navigator.clipboard.writeText(password)
      },[password])

      useEffect(()=>{
         passwordGenerator()
      },[charAllowed,numberAllowed,passwordGenerator])
  return (
    <>
   <div className="container">
   <h1>
    Password Genegrator
   </h1>
  
           <div className="box">
                 <input type="text" placeholder='password' readOnly className='inpttt' value={password} ref={(refarence)}/>
                 <button onClick={copyClipBoard}>Copy</button>
           </div>
           <div className="box">
                <span>
                    <label htmlFor="">Length {length}</label>
                    <input type="range" 
                      min={8}
                      max={100}
                      value={length}
                      onChange={(e)=>{setLength(e.target.value)}}
                    />
                </span>

                <span>
                    <label >Number</label>
                    <input type="checkbox"  onClick={()=>setnumberAllowed(!numberAllowed)}/>
                </span>

                <span>
                    <label>Char</label>
                    <input type="checkbox" 
                     onClick={()=>{setcharAllowed(!charAllowed)}}
                     />
                </span>

           </div>
   </div>
    </>
  );
}

export default App;
