import { createClient } from 'next-sanity'
import dotenv from 'dotenv';
dotenv.config()
import {token} from "../env"
export const client = createClient({
  projectId:"lmmh6lbv",
  dataset:"production",
  token,
  useCdn: false, 
  apiVersion: '2021-08-31'


})
