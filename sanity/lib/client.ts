import { createClient } from 'next-sanity'
import dotenv from 'dotenv';
dotenv.config()

export const client = createClient({
  projectId:"lmmh6lbv",
  dataset:"production",
  token: process.env.token,
  useCdn: false, 
  apiVersion: '2021-08-31'


})
