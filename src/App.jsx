import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  async function generateAnswer() {
    console.log("API Key:", import.meta.env.GEMINI_API_KEY);
    setAnswer('Generating answer...');
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      method: 'POST',
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });

    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
  }

  return (
    <>
    <nav className='navbar flex items-center justify-between h-20 w-screen px-[10%] bg-[#141414] fixed text-white'>
      <div className="text-left text-xl font-medium">Gemini API Chatbot</div>
      <div className="text-right">
        <div className="powered-text">Powered by</div>
        <div className="powered-logo"></div>
      </div>
    </nav>
    <div className="main flex flex-col items-center justify-center h-screen px-[10%] bg-[#212121] text-white">
      <div className="navbar"></div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await generateAnswer();
        }}
        className="flex w-full max-w-2xl"
      >
        <input
          type="text"
          className="flex-grow border border-gray-300 p-2 rounded-l-md focus:outline-none text-[16px]"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
        />
        <button
          type="submit"
          className="bg-white text-black px-4 rounded-r-md hover:bg-[#212121] text-white transition"
        >
          Submit
        </button>
      </form>
      <pre>{answer}</pre>
    </div>
    </>
  )
}

export default App
