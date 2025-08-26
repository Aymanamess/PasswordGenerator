import { useState, useCallback, useEffect, useRef } from "react"


function App() {
  const [length, setLength] = useState(8)

  const [numberAllowed, setNumberAllowed] = useState(false)

  const [charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState("")

  //useRef
  const passwordRef = useRef(null)

  //password generator method
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*[]{}_+\/"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-lg mx-auto 
      shadow.md rounded-3xl  my-30  
       " style={{ color: "white", padding: "20px", backgroundColor: 'blue' }}>

        <b><h1 className="text-center my-3 text-3xl mb-8 " style={{ color: "aquamarine" }}>PASSWORD GENERATOR</h1></b>

        <div className="flex mb-4 items-center w-full max-w-md mb-4 justify-center ml-3">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-left bg-white text-black rounded-l-full "
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none text-black py-2 px-4 bg-aquamarine rounded-r-full"
            style={{ backgroundColor: "aquamarine" }}
          >
            Copy
          </button>
        </div>



        <div className="flex text-sm gap-x-2 justify-center">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer "
              onChange={(e) => { setLength(e.target.value) }}
            />

            <form >
              <label >Length :{length}</label>
            </form>

          </div>

          <div className="flex text-sm gap-x-2">

            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
             
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex justigy text-sm gap-x-2">

            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>



      </div>

    </>
  )
}

export default App
