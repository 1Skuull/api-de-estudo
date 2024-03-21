import express from "express";
import cors from "cors"
import router from "./routers/router";
import cookieParser  from "cookie-parser"

const app = express()

const PORT =  process.env.PORT || 3000

app.use(express.json())
app.use(cors({ 
  credentials: true, 
  origin : "http://localhost:5173"
}))

app.use(cookieParser());

app.use(router)

app.listen(PORT, () => {
  try {
    console.log("API ONLINE MEU CHAPA")
  } catch (error) {
    console.log(`Error de conexão com a API: ${error}`)
  }
})
