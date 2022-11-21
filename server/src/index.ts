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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`)
})
