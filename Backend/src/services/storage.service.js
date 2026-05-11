const {ImageKit} = require('@imagekit/nodejs')
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
});

async function uploadFile (file){
    const result = await client.files.upload({
        file:file,
        fileName:`profile-picture-${Date.now()}`,
        folder:"manzil-mart/profile-pictures"
    })
    return result;
}


async function uploadMultipleFiles(files){
    let filesArray = []

    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const result = await client.files.upload({
            file:file,
            fileName:`product-image-${Date.now()}-${i}`,
            folder:"manzil-mart/product-images"
        })
        filesArray.push(result);
    }
    return filesArray;
}
module.exports = {uploadFile, uploadMultipleFiles}