import { Router } from 'express'
import connect from './connect'

export const client = Router();

client.get('/connect/:id', connect);