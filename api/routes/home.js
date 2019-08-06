/* eslint-disable no-tabs */
import express from 'express';

const router = express.Router();


router.get('/', async (req, res) => {
    res.send('you are in home');
});
