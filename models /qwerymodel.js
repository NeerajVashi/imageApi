import logger from '../logging/logger';
import pool from './database';

module.exports ={
    async insertImage(data){
        try {
				await pool.query(`INSERT INTO userImage SET ? `, [data]); 
				const [userimage] = await pool.query(`SELECT path FROM userImage where userId =?  `, [data.userId]); 
				
                await logger.info("image inserted");
                return userimage;    
        }
         catch (error) {
            await logger.info(`error in insertion of image:${error}`);
            return error;
		}
    } ,
    async showImages(id) {
		try {
			const [row] = await pool.execute(`SELECT path FROM userImage where userId =? `,[id]);
			return row;
		} catch (error) {
			await logger.error(`error in displaying of  images:${error}`);
			return error;
		}
    },
    async showAlbumByName(name) {
		try {
			const [row] = await pool.execute(`SELECT * FROM userAlbums where albumname =? `,[name]);
			return row;
		} catch (error) {
			await logger.error(`error in displaying of album:${error}`);
			return error;
		}
	},
    async showAlbumById(id) {
		try {
			const [row] = await pool.execute(`SELECT * FROM userAlbums where uploaderid =? `,[id]);
			return row;
		} catch (error) {
			await logger.error(`error in displaying of album:${error}`);
			return error;
		}
	},
    async insertAlbum(data) {
		try {
			await pool.query(`INSERT INTO userAlbums SET ? `, [data]);
            await logger.info("image inserted");
            return {image :'image inserted'};    
        } catch (error) {
			await logger.info(`error in insertion of image:${error}`);
			return error;
		}
	}
}
