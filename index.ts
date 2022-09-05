import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const puppeteer = require('puppeteer')

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

try {
	mongoose.connect(`${process.env.MONGO_URL}`, {})
	console.log('MongoDB connected')
} catch (err) {
	console.log('MongoDB connection error', err)
}

mongoose.connection.on('error', err => {
  console.log('MongoDB connection error: ' + err)
})

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://bankof.okra.ng')
  await page.waitForSelector('nav > a:nth-child(2)')
  await page.click('nav > a:nth-child(2)')

  await page.waitForSelector('#email')
  await page.type('#email', `${process.env.EMAIL}`)
  await page.type('#password', `${process.env.PASSWORD}`)
  await page.click('form > button')

  page.on('dialog', async (dialog: any) => {
    await dialog.dismiss()
	})

  await page.waitForSelector('#otp')
  await page.type('#otp', `${process.env.OTP}`)
  await page.click('form > button')
}


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})