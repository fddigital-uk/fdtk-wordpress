import "./blocks/fullwidth";
import "./blocks/addToCart";
import "./blocks/imageList";
import "./blocks/salesProductList";
import "./blocks/quote";
import "./blocks/videoThumb";

document.addEventListener("DOMContentLoaded", () => {
    const script = document.createElement('script');
    script.src = "http://localhost:35729/livereload.js?snipver=1";
    document.head.appendChild(script);
    window.addEventListener("beforeunload", function(e){
        e.preventDefault();
    }, false);
});
