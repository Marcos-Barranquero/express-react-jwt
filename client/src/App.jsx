import { useState } from 'react'
import './App.css'

const getCookiesAsDict = () => Object.fromEntries(
  document.cookie.split(/; */).map(function (c) {
    var index = c.indexOf('=') // Find the index of the first equal sign
    var key = c.slice(0, index) // Everything upto the index is the key
    var value = c.slice(index + 1) // Everything after the index is the value

    // Return the key and value
    return [decodeURIComponent(key), decodeURIComponent(value)]
  })
)

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

const fetchAuth = async () => {
  // Get token from cookies
  // careful with this, can be multiple cookies
  const cookiesDict = getCookiesAsDict()
  const token = cookiesDict.token
  console.log('Sending token:')
  console.log(token)

  const authRequest = fetch('http://localhost:3000/userAccess', {
    method: 'POST',
    headers: {
      authorization: token,
    },
  })
  const response = await authRequest
  const { message } = await response.json()
  return message
}

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => setUsername(e.target.value)

  const handlePasswordChange = e => setPassword(e.target.value)

  const onSubmit = e => {
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
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='username' value={username} onChange={handleUsernameChange} />
        <input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={onAuth}>Fetch Auth</button>
    </div>
  )
}

export default App
