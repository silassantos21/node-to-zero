import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
// process.env
//import postgres from 'postgres'

const { DATABASE_URL } = process.env

export const sql = neon(DATABASE_URL)