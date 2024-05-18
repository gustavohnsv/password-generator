import { useEffect, useState } from 'react';
import { MdCopyAll } from "react-icons/md";
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  console.log('App');
  
  const [strong, setStrong] = useState<{ color: string, width: string }>({color: "bg-orange-500", width: "w-6/12"});
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const [uppercaseCheck, setUppercaseCheck] = useState(true);
  const [lowercaseCheck, setLowercaseCheck] = useState(true);
  const [symbolsCheck, setSymbolsCheck] = useState(true);
  const [numberCheck, setNumberCheck] = useState(true);

  const randomUpper = () => {
    if (uppercaseCheck) {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    return false;
  }

  const randomLower = () => {
    if (lowercaseCheck) {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    return false;
  }

  const randomSymbol = () => {
    if (symbolsCheck) {
      return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
    }
    return false;
  }

  const randomNumber = () => {
    if (numberCheck) {
      return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    return false;
  }

  function handleGenerate(e: any) { 
    if (!uppercaseCheck && !lowercaseCheck && !symbolsCheck && !numberCheck) {
      alert('Selecione pelo menos uma opção');
      return;
    }
    const length = parseInt(e.target.value);
    setLength(length);
    const generators = [randomUpper, randomLower, randomSymbol, randomNumber];
    let password = "";
    for (let i = 0; i < length; i++) {
      let choice;
      do {
        choice = Math.floor(Math.random() * generators.length);
        var char = generators[choice]();
      } while (!char);
      password += char;
    }
    setPassword(password);
    verificateStrong(password);
  }

  function verifyStrength(password: string) {
      let strength = 0;
      const passwordLength = password.length;
      if (passwordLength >= 8 && passwordLength <= 16) {
          strength++;
      } else if (passwordLength > 16 && passwordLength <= 24) {
          strength += 2;
      } else if (passwordLength > 24 && passwordLength <= 32) {
          strength += 3;
      } else if (passwordLength > 32) {
          strength += 4;
      } 
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
          strength++;
      }   
      if (/\d/.test(password)) {
          strength++;
      }   
      if (/[^A-Za-z0-9]/.test(password)) {
          strength++;
      } 
      return strength;
  }

  function verificateStrong(password: string) {
      const strength = verifyStrength(password);
      let color = "";
      let width = "";
      if (strength <= 2) {
          color = "bg-red-500";
          width = "w-3/12";
      } else if (strength <= 4) {
          color = "bg-orange-500";
          width = "w-6/12";
      } else if (strength <= 6) {
          color = "bg-yellow-500";
          width = "w-9/12";
      } else {
          color = "bg-green-500";
          width = "w-full";
      }
      setStrong({ color, width });
  } 

  function copyToClipboard() {
    navigator.clipboard.writeText(password);
    toast.success('Senha copiada para a área de transferência', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      });
  }

  useEffect(() => {
      handleGenerate({ target: { value: length } } as any);
  }, []); 

  return (
    <div className='w-full min-h-screen bg-gray-200 flex justify-center items-center px-4'>
      <main className='my-10 w-full xl:w-7/12 gap-3 flex flex-col justify-center items-center'>
        <p > Tamanho da senha: <span className='font-medium'> { length } </span> caracteres </p>
        <div className='w-7/12 flex gap-2'>
          <input className='outline-none p-2 w-full text-black text-sm shadow-md' type='text' value={password} readOnly/>
          <button onClick={copyToClipboard} className='bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600'>
            <MdCopyAll size={24} />
          </button>
        </div>
        <div className='w-7/12 bg-gray-400 h-2 rounded-md'>
          <div className={`${strong.width} ${strong.color} h-2 duration-700 rounded-md`}> 
          </div>
        </div>
        <input type="range" value={length} onChange={handleGenerate} min={1} max={64}/>
        <section className='flex flex-col gap-4'>
          <div>
            <input 
            type="checkbox" 
            name='uppercase'
            defaultChecked={true}
            onClick={() => setUppercaseCheck(!uppercaseCheck)}
            />
            <label> Letras maiusculas </label>
          </div>
          <div>
            <input 
            type="checkbox" 
            name='lowercase'
            defaultChecked={true} 
            onClick={() => setLowercaseCheck(!lowercaseCheck)}
            />
            <label> Letras minusculas </label>
          </div>
          <div>
            <input 
            type="checkbox" 
            name='symbols'
            defaultChecked={true}
            onClick={() => setSymbolsCheck(!symbolsCheck)}
            />
            <label> Simbolos </label>
          </div>
          <div>
            <input 
            type="checkbox" 
            name='number'
            defaultChecked={true} 
            onClick={() => setNumberCheck(!numberCheck)}
            />
            <label> Numeros </label>
          </div>
        </section>
        <span className='text-sm'> Segurança da senha baseada em 64 caracteres. </span>
      </main>
      <ToastContainer />
    </div>
  );
}