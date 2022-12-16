function startStars(){
  var stars = [];
  var starCount = 100;
  var starSize = '10px';
  var starColor = 'white';
  function createStar() {
    var star = document.createElement('div');
    star.innerHTML = '*';
    star.classList.add("stars");
    star.style.position = 'fixed';
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    while(star.style.left.slice(0, -1) > 30 && star.style.left.slice(0,-1) < 70){
      star.style.left = Math.random() * 100 + '%';
    }
    star.style.fontSize = starSize;
    star.style.color = starColor;
    star.style.opacity = 0;
    star.style.zIndex = -1;
  
    var delay = Math.random() * 5 + 's';
    star.style.animationDelay = delay;
  
    document.body.appendChild(star);
    stars.push(star);
  }
  for (var i = 0; i < starCount; i++) {
    createStar();
  }
}

startStars();




