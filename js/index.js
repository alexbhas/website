var Typer = {
  text: "",
  index: 0,
  speed: 2,
  file: "",
  accessCount: 0,
  deniedCount: 0,
  init: function () {
    $.get(Typer.file, function (data) {
      Typer.text = data;
      Typer.text = Typer.text.slice(0, Typer.text.length - 1);
    });
  },

  content: function () {
    return $("#console").html();
  },

  write: function (str) {
    $("#console").append(str);
    return false;
  },

  addText: function (key) {
    if (key.keyCode == 18) {
      Typer.accessCount++;

      if (Typer.accessCount >= 3) {
        Typer.makeAccess();
      }
    } else if (key.keyCode == 20) {
      Typer.deniedCount++;

      if (Typer.deniedCount >= 3) {
        Typer.makeDenied();
      }
    } else if (key.keyCode == 27) {
      Typer.hidepop();
    } else if (Typer.text) {
      var cont = Typer.content();
      if (cont.substring(cont.length - 1, cont.length) == "|")
        $("#console").html(
          $("#console")
            .html()
            .substring(0, cont.length - 1)
        );
      if (key.keyCode != 8) {
        Typer.index += Typer.speed;
      } else {
        if (Typer.index > 0) Typer.index -= Typer.speed;
      }
      var text = Typer.text.substring(0, Typer.index);
      var rtn = new RegExp("\n", "g");

      $("#console").html(text.replace(rtn, "<br/>"));
      window.scrollBy(0, 50);
    }

    if (key.preventDefault && key.keyCode != 122) {
      key.preventDefault();
    }

    if (key.keyCode != 122) {
      key.returnValue = false;
    }
  },

};

if(window.location.pathname.split("/").pop().includes("about.html")){
  Typer.file = "pageText/aboutText.html";
} else if(window.location.pathname.split("/").pop().includes("resume.html")){
  Typer.file = "pageText/resumeText.html";
} else if(window.location.pathname.split("/").pop().includes("projects.html")){
  Typer.file = "pageText/projectText.html";
} else {
  Typer.file = "pageText/indexTextDynamic.html";
}

function staticChange(){
  if(JSON.parse(localStorage.getItem('static-page')) === false || JSON.parse(localStorage.getItem('static-page')) === null){
    localStorage.setItem('static-page', true);
  } else {  
    localStorage.setItem('static-page', false);
  }
}

if(JSON.parse(localStorage.getItem('static-page')) === false || JSON.parse(localStorage.getItem('static-page')) === null){
  Typer.speed = 3;
} else {
  Typer.speed = Number.MAX_SAFE_INTEGER;
  if(Typer.file == "pageText/indexTextDynamic.html"){
    Typer.file = "pageText/indexTextStatic.html";
  }
}

Typer.init();
var timer = setInterval("t();", 30);
function t() {
  Typer.addText({ keyCode: 123748 });

  if (Typer.index > Typer.text.length) {
    clearInterval(timer);
  }
}

var addTimer = setInterval("concat();", 500);
function concat(){
  let end = document.getElementById("end");
  if(!(end == null)){
    if(end.innerHTML.includes("|")){
      end.innerHTML = end.innerHTML.split("|")[0];
    } else {
      end.innerHTML = end.innerHTML + " |";
    }
    
  }

}