const fs = require("fs");
const dicomParser = require("dicom-parser"); // library to parse dicom files
const jpeg = require("jpeg-js");// librar to encoder image jpeg
const { execSync } = require("child_process"); // to execute shell commands 

const dicomFilePath = "input/img.dcm";
const outputJPEG = "output/image.jpg";
const outputPGM = "output/image.pgm"; // i conevrt to pgm before converting to JP2 and JPH because i get this error ( Unknown input file format: img.dcm 
// Known file formats are *.pnm, *.pgm, *.ppm, *.pgx, *png, *.bmp, *.tif(f), *.raw, *.yuv or *.tga
// )
const outputJP2 = "output/image.jp2";
const outputJPH = "output/image.jph";

// extract PixelData
function extractPixelData(dicomFilePath) {
    const dicomBuffer = fs.readFileSync(dicomFilePath); // read dicom file
    const dataSet = dicomParser.parseDicom(dicomBuffer); // parse it
    const pixelDataElement = dataSet.elements.x7fe00010; // recover pixelData

    if (!pixelDataElement) throw new Error("No PixelData found !");
    
    return Buffer.from(dicomBuffer.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
}
//Sauvegarde image en format PGM

function saveAsPGM(pixelData, width = 512, height = 512) {
    console.log("Conversion to PGM...");
    const header = `P5\n${width} ${height}\n255\n`; //PGM File Header
    const pgmBuffer = Buffer.concat([Buffer.from(header), pixelData]);
    fs.writeFileSync(outputPGM, pgmBuffer);// save the file
    console.log("PGM generated:", outputPGM);
}
// Compression to format JPEG
function compressJPEG(pixelData, width = 512, height = 512, quality = 80) {
    console.time("JPEG Compression");
    const rawImage = { data: pixelData, width, height };
    const jpegImage = jpeg.encode(rawImage, quality);
    fs.writeFileSync(outputJPEG, jpegImage.data);
    console.timeEnd("JPEG Compression");
    console.log("JPEG generated:", outputJPEG, "Size:", fs.statSync(outputJPEG).size, "bytes");
}
// Compression to format JP2 avec OpenJPEG
function compressJP2() {
    console.time("JP2 Compression");
    execSync(`opj_compress -i ${outputPGM} -o ${outputJP2} -r 20`);
    console.timeEnd("JP2 Compression");
    console.log("JP2 generated:", outputJP2, "Size:", fs.statSync(outputJP2).size, "bytes");
}

// Compression en format JPH avec OpenJPH

function compressJPH() {
    console.time("JPH Compression");
    execSync(`ojph_compress -i ${outputPGM} -o ${outputJPH} -q 50`);// the command failed stil cant figureout why
    console.timeEnd("JPH Compression");
    console.log("JPH generated:", outputJPH, "Size:", fs.statSync(outputJPH).size, "bytes");
}

(async () => {
    try {
        const pixelData = extractPixelData(dicomFilePath);
        saveAsPGM(pixelData);
        compressJPEG(pixelData);
        compressJP2();
        compressJPH();
    } catch (err) {
        console.error("Error:", err.message);
    }
})();
