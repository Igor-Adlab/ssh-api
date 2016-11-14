import { Router } from 'express'
import ls from './readdir'

export const sftp = Router();

sftp.get('/readdir', ls);