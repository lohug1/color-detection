// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,255]

export function hsv2rgb(h,s,v) 
{                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  return [Math.round(255 * f(5)),Math.round(255 *f(3)),Math.round(255 * f(1))];       
}  

// input: r,g,b in [0,255], out: h in [0,360) and s,v in [0,1]
function rgb2hsv(r,g,b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let v=Math.max(r,g,b), c=v-Math.min(r,g,b);
    let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c)); 
    return [60*(h<0?h+6:h), v&&c/v, v];
  }