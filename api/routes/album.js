import express from 'express';
import container from '../../models /qwerymodel';

import logger from '../../logging/logger';
import multer from 'multer';
require('dotenv').config();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./albumuploads/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage});

const router = express.Router();

router.post('/',  upload.single('image'),async (req,res)=>{
    if(req.file===undefined){
        logger.error('upload an image')
        res.json({error:'upload an image '})
   
    }else{
            const data={
                userId :req.body.userId,
                albumname:req.body.albumname,
                path:`http://localhost:${process.env.PORT}/`+req.file.path
            }
            const ret = await container.insertAlbum(data);
            await res.json(ret);  
    } 
})


router.get('/:id', async (req,res)=>{
    const ret = await container.showAlbumByName(req.params.id);
    await res.json(ret);  
})

router.get('/al/:name', async (req,res)=>{
    const ret = await container.showAlbumById(req.params.name);
    await res.json(ret);  
})

module.exports = router;
    