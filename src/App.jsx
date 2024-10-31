import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()<>?{}[]:;><,./`~';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-center text-white text-2xl font-semibold mb-6">🔒 Password Generator</h1>
        
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="w-full py-2 px-4 text-lg bg-gray-700 text-white rounded-lg outline-none"
            placeholder="Generated Password"
          />
          <button
            onClick={copyPassword}
            className="ml-4 py-2 px-3 bg-violet-500 text-white font-semibold rounded-lg hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300 transition duration-200"
          >
            Copy
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-400 font-medium mb-2">Password Length: {length}</label>
          <input
            type="range"
            min="6"
            max="100"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full cursor-pointer bg-violet-500 rounded-lg"
          />
        </div>
        
        <div className="flex justify-between text-white font-medium">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numbers"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-violet-500"
            />
            <label htmlFor="numbers" className="ml-2 text-gray-300">Include Numbers</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={charAllowed}
              id="symbols"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-violet-500"
            />
            <label htmlFor="symbols" className="ml-2 text-gray-300">Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
