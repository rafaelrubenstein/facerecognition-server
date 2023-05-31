const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
require('dotenv').config();

const stub = ClarifaiStub.grpc();

const KEY = process.env.KEY;
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key "+KEY);


const imageData = (req, res) => {
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": "clarifai",
                "app_id": "main"
            },
            model_id: "face-detection",
            inputs: [
                { data: { image: { url: req.body.input } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            const output = response.outputs[0];
            res.json(output);
        }
    );
}

  
const updateImage = (req,res,DB) => {
   
    const { id } = req.body;     
    DB('users').where('user_id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(respone => {
        res.json(respone[0].entries);
    })
    .catch(err => res.status(400).json("error getting data")) 

} 




module.exports = {
updateImage: updateImage,
imageData: imageData

};