import { hsv2rgb } from "./utils";

export function ColorBar({target_hue, threshold}){
    var width = 400;
    var height = 200;

    let buffer = new Uint8ClampedArray(width * height * 4);
    let row = new Uint8ClampedArray(width * 4);
    if(target_hue !== undefined && threshold){
        for(var x = 0; x < width; x++) {
            var pos = x * 4;
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
            if((interval[0] < x / width * 360 && interval[1] > (x / width * 360)) != isOverflow){
                row[pos] = 255;           // some R value [0, 255]
                row[pos+1] = 255;           // some G value
                row[pos+2] = 255;           // some B value
                row[pos+3] = 255;    
            }else{
                row[pos] = 0;           // some R value [0, 255]
                row[pos+1] = 0;           // some G value
                row[pos+2] = 0;           // some B value
                row[pos+3] = 255;    
            }
        }
        for(var y = 0; y < height; y++) {
            buffer.set(row, y * row.length);
        }   
    }else{
        for(var y = 0; y < height; y++) {
            for(var x = 0; x < width; x++) {
                var pos = (y * width + x) * 4; // position in buffer based on x and y
                let [r,g,b] = hsv2rgb(x / width * 360, 1, 1);
                buffer[pos] = r;           // some R value [0, 255]
                buffer[pos+1] = g;           // some G value
                buffer[pos+2] = b;           // some B value
                buffer[pos+3] = 255;           // set alpha channel
            }
        }
    }
    
    
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    var idata = ctx.createImageData(width, height);

    idata.data.set(buffer);

    ctx.putImageData(idata, 0, 0);
    var dataUri = canvas.toDataURL(); 
    return (
        <img src={dataUri}/>
    )
}