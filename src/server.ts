import express, { Request, Response } from "express";
import cors from "cors"
import { router } from "./router";
import cookieParser  from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cors({ 
  credentials: true, 
  origin : ["http://localhost:5173"] 
}))

app.use(cookieParser());

app.use(router)

app.listen(9191, () => {
  try {
    console.log("API CONECTADA")
  } catch (error) {
    console.log(`Error de conexão: ${error}`)
  }
})