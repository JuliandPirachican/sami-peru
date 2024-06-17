export function style_iframe() {
    console.log("dentro del archivo de estilo")
    var iframe = document.getElementById("iframe_option");
    iframe.onload = function () {
      var contentiframe = iframe.contentDocument;
      console.log(contentiframe);
  
      var stylebootstrap = contentiframe.createElement("link");
      stylebootstrap.rel = "stylesheet";
      stylebootstrap.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
      contentiframe.head.appendChild(stylebootstrap);
  
      var scriptbootstrap = contentiframe.createElement("script");
      scriptbootstrap.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
      contentiframe.body.appendChild(scriptbootstrap);
    };
  }
  