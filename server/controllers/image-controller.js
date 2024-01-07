import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:4000';

// let gfs, gridfsBucket;
// const conn = mongoose.connection;
// conn.once('open', () => {
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'fs'
//     });
//     gfs = grid(conn.db, mongoose.mongo);
//     gfs.collection('fs');
//     return gfs;
// });

const conn = mongoose.createConnection(process.env.URL);
let grf;

conn.once("open", () => {
  grf = grid(conn.db, mongoose);
});

export const uploadImage = (request, response) => { //ye pura copied hai coz chal ni rha code
    console.log(request.file);
    console.log("upload image");
    if(!request.body.file) 
        return response.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${request.body.name}`;

    response.status(200).json(imageUrl);    
}
export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        console.log(file);
        // const readStream = gfs.createReadStream(request.params.filename);
        // readStream.pipe(response);
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'fs',
        });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}