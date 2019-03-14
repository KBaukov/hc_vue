export default {
  getElementPosition: elemId => {
    var elem = document.getElementById(elemId);
    var w = elem.offsetWidth;
    var h = elem.offsetHeight;
    var l = 0;
    var t = 0;
    while (elem) {
        l += elem.offsetLeft;
        t += elem.offsetTop;
        elem = elem.offsetParent;
    }
    return {"left":l, "top":t, "width": w, "height":h};
  },
  resizeImage: (wOffset, imgId) => {
    var dim = this.getElementPosition('app');
    var h = dim.height; //this.getHeight();
    var w = dim.width; //this.getWidth();
    var winRatio = w/h;
    var imgW = w - wOffset;
    if( winRatio>=1.3 ) { imgW = (h-40)*1.3; }
    var el = document.getElementById(imgId);
    if(el) {  el.width=imgW; }
  },
  relocateElement:(elId, imgW, elData)=>{
    var imgH = imgW / 1.3;
    var el =  document.getElementById(elId);
    if(el) {
      el.style.top  = (20 + imgH * elData.yk)+'px';
      el.style.left = (imgW * elData.xk)+'px';
    }
  },
  toBodyFormData: data => {
    var bfd = new FormData();
    for (var prop in data) {
        bfd.append(prop, data[prop]);
    }
    return bfd;
  }
}