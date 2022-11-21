import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = 3000

app.use(express.json())

// cors
app.use(cors({ origin: '*' }))

// simple hello world route to test
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// simple login route with jwt
app.post('/login', (req, res) => {
  const { username } = req.body
  // TODO: validate username and password

  // create jwt token
  const token = jwt.sign({ username }, 'serverSecret', { expiresIn: '1h' })

  // send token to client
  res.status(200).json({ token })
})

app.post('/userAccess', (req, res) => {
  console.log('Petition received!')
  console.log(req.body)
  const token = req.headers['authorization'] // get token from explicit header

  if (token === undefined) res.status(401).json({ message: 'No token provided' })

  // verify token
  jwt.verify(token, 'serverSecret', (err, decoded) => {
    if (err) res.status(401).json({ message: 'Unauthorized' })
    else res.status(200).json({ message: `${decoded} is authorized!` })
  })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`)
})
