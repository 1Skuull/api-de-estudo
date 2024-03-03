import express from "express";
import cors from "cors"
import router from "./routers/router";
import cookieParser  from "cookie-parser"

const app = express()

const PORT =  process.env.PORT || 3000

app.use(express.json())
app.use(cors({ 
  credentials: true, 
  origin : "*"
}))

app.use(cookieParser());

app.use(router)

app.get('/teste', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  res.cookie('token', "bunda", { maxAge: 3600000, httpOnly: false });

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)

  return res.status(200).json({ msg: "bunda" })
})

app.listen(PORT, () => {
  try {
    console.log("API ONLINE MEU CHAPA")
  } catch (error) {
    console.log(`Error de conexão com a API: ${error}`)
  }
})
