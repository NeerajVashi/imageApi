import express from 'express';
import container from '../../models /qwerymodel';
import multer from 'multer';
import logger from '../../logging/logger';

require('dotenv').config();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})

const router = express.Router();

router.post('/',  upload.single('image'),async (req,res)=>{
    if(req.file===undefined){
        logger.error('upload an image')
        res.json({error:'upload an image '})
    }else{
    const data={
        userId :req.body.userId,
        path:`http://localhost:${process.env.PORT}/`+req.file.path,
        postId:req.body.postId
    }
        const ret = await container.insertImage(data);
        await res.json(ret);  
    }
})
router.post('/post/',  upload.single('image'),async (req,res)=>{
   if(req.file===undefined){
       logger.error('upload an image')
       res.json({error:'upload an image '})
   }else{
   const data={
       userId :req.body.userId,
       path:`http://localhost:${process.env.PORT}/`+req.file.path,
       postId:req.body.postId
   }
       const ret = await container.insertPostImage(data);
       await res.json(ret);
   }
})

router.get('/:id', async (req,res)=>{
    const ret = await container.showImages(req.params.id);
    await res.json(ret);  
})

module.exports = router;
    
