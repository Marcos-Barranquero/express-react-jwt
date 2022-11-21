import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()

app.use(express.json())

// cors
app.use(cors({ origin: 'http://localhost:3000' }))

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  // TODO: validate username and password

})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
 