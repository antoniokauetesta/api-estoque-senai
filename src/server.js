import express from "express"
import {prisma} from "./lib/primsa.ts"
const app = express()
const PORT = 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log("API subida")
})