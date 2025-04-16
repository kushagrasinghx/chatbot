import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  async function generateAnswer() {
    setAnswer('Generating answer...');
    const response = await axios({
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA5dK4mAwleXTogVtUUgmI150tsyweKD50',
      method: 'POST',
      data: {
        "contents": [{
          "parts":[{"text": question}]
        }],
      },
    })

    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
  }

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Chat AI</h1>
      <textarea value={question} onChange={(event)=> setQuestion(event.target.value)} rows="10" cols="50"></textarea>
      <button onClick={generateAnswer}>Generate Answer</button>
      <pre>{answer}</pre>
    </>
  )
}

export default App
