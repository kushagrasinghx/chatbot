import { useState } from 'react';
import axios from 'axios';
import './App.css';
import sendIcon from './assets/icons/send.svg';
import messageIcon from './assets/icons/message-square.svg';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const parseMarkdown = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, '<span class="bold">$1</span>');
    text = text.replace(/(?<!\*)\*(.*?)(?=\*)/g, '<span class="italic">$1</span>');
    text = text.replace(/__(.*?)__/g, '<span class="underline">$1</span>');
  
    return text;
  };

  async function generateAnswer() {
    setAnswer('Generating answer...');
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      method: 'POST',
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });

    const rawAnswer = response.data.candidates[0].content.parts[0].text;
    setAnswer(parseMarkdown(rawAnswer));
  }

  return (
    <>
      <nav className='navbar flex items-center justify-between h-20 w-screen px-[10%] bg-[#141414] fixed text-white'>
        <div className="flex items-center gap-2 text-left text-xl font-medium">
          <img src={messageIcon} className="w-5 h-5" />
          <div className="nav-text">Google API Chatbot</div>
        </div>
        <div className="text-right">
          <div className="powered-text text-[14px]">Powered by Gemini</div>
          <div className="powered-logo"></div>
        </div>
      </nav>

      <div className="main flex flex-col items-center justify-center h-screen px-[10%] bg-[#212121] text-white">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await generateAnswer();
          }}
          className="flex w-full max-w-2xl gap-2 h-[50px]"
        >
          <input
            type="text"
            className="flex-grow border border-[rgba(255,255,255,0.25)] bg-[#141414] text-white p-2 rounded-full focus:outline-none text-[16px] placeholder:text-[rgba(255,255,255,0.25)] px-[20px]"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Message AI"
          />
          <button
            type="submit"
            className="w-12 h-12 bg-white text-black px-4 rounded-full border border-[rgba(255,255,255,0.25)] hover:bg-[#212121] hover:text-white transition cursor-pointer"
          >
            <img src={sendIcon} alt="Submit" className="w-10 h-10" />
          </button>
        </form>

        <div className="response-container min-h-[400px] w-full max-w-2xl mt-4">
          <div
            className={`response border border-[rgba(255,255,255,0.25)] bg-[#141414] text-white max-h-[400px] w-full overflow-y-auto p-4 ${answer ? '' : 'hidden'}`}
          >
            <div
              className="response-text"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
