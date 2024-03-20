const fs = require('fs')

const writeUrl = (url)=>{
    const filePath = './url.txt';
    fs.writeFileSync(filePath, url);
}
module.exports = {writeUrl}