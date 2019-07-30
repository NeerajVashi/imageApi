/* eslint-disable no-tabs */
import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import logger from '../logging/logger';

import album from '../api/routes/album';
import image from '../api/routes/image';

import alowmidle from '../middleware/allow';

require('dotenv').config();

const app = express();
app.use(bodyparser.urlencoded({
	extended: true,
}));
app.use('/uploads', express.static('uploads'));
app.use('/albumuploads', express.static('albumuploads'));

app.use(bodyparser.json());
app.use(cors());
app.use('/album', alowmidle, album);
app.use('/image', alowmidle, image);



app.listen(process.env.PORT, () => {
	logger.info('server running');
});

module.exports = app;
