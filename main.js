document.querySelector("#dark-mode-toggle").addEventListener('click', () => {

    
    if(JSON.parse(localStorage.getItem('dark-mode-enabled')) === true){
        localStorage.setItem('dark-mode-enabled', false);
    } else {
        localStorage.setItem('dark-mode-enabled', true);   
    }
    

    document.body.classList.toggle("latex-dark");
    let button = document.getElementById("dark-mode-toggle");

    if(button.innerHTML == '<img alt="Moon" src="moon.png">'){
        button.innerHTML = '<img alt="Sun" src="sun.png">'
        button.name="Disable Dark Mode"
        
        //Set the CSS of dark mode text to be whiter
    } else {
        button.innerHTML = '<img alt="Moon" src="moon.png">'
        button.name="Enable Dark Mode"
    }
    
})

function darkMode(){

    document.body.classList.toggle("latex-dark");
    let button = document.getElementById("dark-mode-toggle");
    button.innerHTML = '<img alt="Sun" src="sun.png">'
    button.name="Disable Dark Mode"
    
}

document.addEventListener("DOMContentLoaded", function(){
   
    //Maybe change this to an event listener
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        localStorage.setItem('dark-mode-enabled' , true);
        document.getElementById("dark-mode-toggle").style.display = "none";
    }

    if(JSON.parse(localStorage.getItem('dark-mode-enabled')) === true){
        darkMode();
    }
});