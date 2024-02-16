import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [password, setPassword] = useState("");
  const [isNumAllow, setIsNumAllow] = useState(false);
  const [isCharAllow, setIsCharAllow] = useState(false);
  const [length, setLength] = useState(8);
  const passInputRef = useRef(null);


  useEffect(()=>{
    passwordGenerator();
   },[isCharAllow, isNumAllow, length])


  const passwordGenerator = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";

    if (isNumAllow) str+="123456789";
    if(isCharAllow) str+="!@#$%^&*()_+?><";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
   }, [isCharAllow, isNumAllow, length,setPassword])


   const handleCopyToClipboard = useCallback(()=>{

    window.navigator.clipboard.writeText(password);
    console.log("click", passInputRef);
    passInputRef.current?.select();

   },[password])


   

  return (
    <>
      <div className='w-screen h-screen bg-black p-6'>
        <h1 className=' text-2xl font-bold text-white text-center'>password generator</h1>
        <div className=" bg-slate-300 max-w-screen-sm mx-auto my-8 p-4 flex justify-center flex-col items-center h-[300px] rounded-lg">
          <div className="flex gap-2">
            <input
              className='p-2 rounded-lg'
              type="text"
              value={password}
              ref={passInputRef}

            />
            <button
              className='bg-blue-500 rounded-lg p-2 text-white hover:bg-blue-600'
              onClick={handleCopyToClipboard}
            >Copy</button>
          </div>
          <div className="flex gap-2">
            <input
              type="range"
              min={8}
              max={18}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label >length : {length}</label>
            <input
              type="checkbox"
              defaultChecked={isNumAllow}
              onChange={() => setIsNumAllow(prev => !prev)}
              className=''
            />
            <label >Numbers</label>
            <input
              type="checkbox"
              defaultChecked={isCharAllow}
              onChange={()=>setIsCharAllow(prev => !prev)}
              className=''
            />
            <label >Characters</label>

          </div>

        </div>
      </div>

    </>
  )
}

export default App
