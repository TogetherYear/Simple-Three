const compressing = require('compressing');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const inputPath = path.join(__dirname, '../Dist');
const outputPath = path.join(__dirname, '../Dist.zip');

const zipStream = new compressing.zip.Stream();

zipStream.addEntry(inputPath);

const destStream = fs.createWriteStream(outputPath);

const result = zipStream.pipe(destStream);

result.on('finish', () => {
    cp.exec(`explorer.exe /select,"${outputPath}"`);
});
