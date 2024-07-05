import { rgb2hsv } from "./utils";
import flowerImage from "./flower";
import { createRef } from "react";

export function ImageWithMask({target_hue, threshold}){
    var width = 735;
    var height = 491;
    var img = new Image();
    img.src = flowerImage();
    //var context = document.getElementById('myCanvas').getContext('2d');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0);
    // create imageData object
    var idata = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(idata, 0, 0);

    let buffer = new Uint8ClampedArray(width * height * 4);
    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            let [h,s,v] = rgb2hsv(idata.data[pos], idata.data[pos + 1], idata.data[pos + 2]);
            var pos = (y * width + x) * 4; // position in buffer based on x and y
            let interval = [target_hue - threshold, target_hue + threshold];
            let isOverflow = false;
            if(interval[0] < 0){ 
                let aux = interval[1];
                interval[1] = interval[0] + 360;
                interval[0] = aux;
                isOverflow = true;
            }
            if(interval[1] > 360){ 
                let aux = interval[1];
                interval[1] = interval[0];
                interval[0] = aux % 360;
                isOverflow=true;
            }
            if((interval[0] < h && interval[1] > h)!= isOverflow){
                buffer[pos] = idata.data[pos];           // some R value [0, 255]
                buffer[pos+1] = idata.data[pos + 1];           // some G value
                buffer[pos+2] = idata.data[pos + 2];           // some B value
                buffer[pos+3] = 255;    
            }else{
                let grayScale = 0.299 * idata.data[pos] +  0.587 *  idata.data[pos+1] + 0.114 * idata.data[pos+2];
                buffer[pos] = grayScale;           // some R value [0, 255]
                buffer[pos+1] = grayScale;           // some G value
                buffer[pos+2] = grayScale;           // some B value
                buffer[pos+3] = 255;           // set alpha channel
            }
        }
    }
    var processedCanvas = document.createElement('canvas'),
    ctx = processedCanvas.getContext('2d');

    processedCanvas.width = width;
    processedCanvas.height = height;

    // create imageData object
    var imdata = ctx.createImageData(width, height);

    // set our buffer as source
    imdata.data.set(buffer);

    // update canvas with new data
    ctx.putImageData(imdata, 0, 0);
    var dataURI = processedCanvas.toDataURL(); 

    return (
        <img src={dataURI} />
    );
}