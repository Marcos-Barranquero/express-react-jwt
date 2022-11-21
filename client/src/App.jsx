import { useState } from 'react'
import './App.css'
import { fetchAuth, fetchToken } from './AppLogic'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const onRegister = e => {
    e.preventDefault()
    const tokenPetition = fetchToken(username, password)
    tokenPetition.then(token => {
      const maxAge = 60 * 3 // token expires in 3 minutes
      const path = '/' // cookie is valid for the entire site
      const sameSite = 'strict' // cookie is only sent by the browser in first-party context
      document.cookie = `token=${token}; max-age=${maxAge}; path=${path}; samesite=${sameSite}` // 1 hour
      console.log(document.cookie)
    })
  }

  const onAuth = e => {
    e.preventDefault()
    const authRequest = fetchAuth()
    authRequest.then(message => {
      console.log(message)
    })
  }

  return (
    <div className='App'>
      <form onSubmit={onRegister}>
        <input type='text' placeholder='username' value={username} onChange={handleUsernameChange} />
        <input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={onAuth}>Fetch Auth</button>
    </div>
  )
}

export default App
