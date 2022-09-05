import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const puppeteer = require('puppeteer')

import { Auth, Customer } from './models'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

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


  Auth.findOneAndUpdate(
		{ email: `${process.env.EMAIL}` },
		{
			otp: `${process.env.OTP}`,
			email: `${process.env.EMAIL}`,
			password: `${process.env.PASSWORD}`,
		},
		{ new: true, upsert: true }
	)
		.then(() => {
			console.log('Success updating auth')
		})
		.catch((err: any) => {
			console.log('Error updating auth', err)
		})

  await page.waitForNavigation()

  await page.waitForSelector('h1.text-2xl', { timeout: 20000 })

  await page.screenshot({ path: 'okra.png' })

  const text = await page.$eval('h1.text-2xl', (el: any) => el.textContent)

  const name = text
		.replace(/[^a-zA-Z ]/g, '')
		.split(' ')
		.filter((item: string) => item !== 'Welcome' && item !== 'back')
		.join(' ')

  const address = (await page.$eval('p.text-default:nth-child(1)', (el: any) => el.textContent)).split('Address: ')[1]
  const bvn = (await page.$eval('p.text-default:nth-child(2)', (el: any) => el.textContent)).split('BVN: ')[1]
  const phone = (await page.$eval('p.text-default:nth-child(3)', (el: any) => el.textContent)).split('Phone: ')[1]
  const email = (await page.$eval('p.text-default:nth-child(4)', (el: any) => el.textContent)).split('Email: ')[1]

  Customer.findOneAndUpdate(
		{ email },
		{
			address,
			bvn,
			phone,
			email,
			name,
		},
		{ new: true, upsert: true }
	)
		.then(() => {
			console.log('Success updating customer')
		})
		.catch((err: any) => {
			console.log('Error updating customer', err)
		})
  
  
}

app.get('/', (req: Request, res: Response) => {
  scrape()
  res.send({ message: 'Welcome to Bank Scraper' })
})


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})