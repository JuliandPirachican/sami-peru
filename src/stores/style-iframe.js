function apply_class_input(contentiframe){
    var inputs=contentiframe.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].className += " form-control";
    }
    return inputs
  }

  function apply_class_table(contentiframe){
    var table=contentiframe.getElementsByTagName("table");
    var tdelements=contentiframe.querySelectorAll("table td");
    for (var i = 0; i < table.length; i++) {
        table[i].className += " table table-borderless  table-responsive text-center ";
    }

    tdelements.forEach(td => {
        td.removeAttribute('align');
        td.removeAttribute('width');
      });

    return table
  }
 
  function apply_class_img_btn(contentiframe){
    var img=contentiframe.getElementsByTagName("img");
    for (var i = 0; i < img.length; i++) {
      img[i].className += "btn btn-warning";
    }
    return img
  }

export function style_iframe_cgis() {
    console.log("dentro del archivo de estilo")
    var iframe = document.getElementById("iframe_option");
    iframe.style.height="500px";
    iframe.onload = function () {
    //   var contentiframe = iframe.contentDocument;
    //   console.log(contentiframe);
  
    //   var stylebootstrap = contentiframe.createElement("link");
    //   stylebootstrap.rel = "stylesheet";
    //   stylebootstrap.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
    //   contentiframe.head.appendChild(stylebootstrap);
    
    //   var style_def=contentiframe.getElementsByTagName("link")[0];
    //   style_def.parentNode.removeChild(style_def);

    //   var scriptbootstrap = contentiframe.createElement("script");
    //   scriptbootstrap.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
    //   contentiframe.body.appendChild(scriptbootstrap);

    //   var title=contentiframe.getElementsByClassName("x-titulo");
    //   title.className+="text-center";
      
    //   apply_class_input(contentiframe);
    //   apply_class_table(contentiframe);
    //   apply_class_img_btn(contentiframe);

     
    };
  }



  
  