import { useState } from 'react'
import './App.css'

const fetchToken = async (username, password) => {
  const post = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }
  const response = await fetch('http://localhost:3000/login', post)
  const { token } = await response.json()
  return token
}

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => setUsername(e.target.value)

  const handlePasswordChange = e => setPassword(e.target.value)

  const onSubmit = e => {
    e.preventDefault()
    const tokenPetition = fetchToken(username, password)
    tokenPetition.then(token => console.log(`Received token: ${token}`))
  }

  return (
    <div className='App'>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='username' value={username} onChange={handleUsernameChange} />
        <input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
