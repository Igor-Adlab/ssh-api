import { Router } from 'express'

import { client } from './client'
import { sftp } from './sftp'

export const v1 = Router();

v1.use('/client', client);
v1.use('/sftp', sftp);