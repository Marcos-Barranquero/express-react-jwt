export const getCookiesAsDict = () =>
  Object.fromEntries(
    document.cookie.split(/; */).map(function (c) {
      var index = c.indexOf('=') // Find the index of the first equal sign
      var key = c.slice(0, index) // Everything upto the index is the key
      var value = c.slice(index + 1) // Everything after the index is the value

      // Return the key and value
      return [decodeURIComponent(key), decodeURIComponent(value)]
    })
  )

export const fetchToken = async (username, password) => {
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

export const fetchAuth = async () => {
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
