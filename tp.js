function jouer(){
    var taille = document.getElementById("size");
    game = new  MemoryGame(taille.value);
    game.Play();
    var temps = document.getElementById("time");
    setTimeout(()=>game.HIDEN(),temps.value*1000);
    var time = setInterval(() =>game.managerTimer(),1000);
   
}
  
function cacher(){
    var taille = document.getElementById("size");
    game = new  MemoryGame(taille.value);
    game. HIDEN();
}


class MemoryGame {
    init() {
        for(let i=1;i<= this.size;i++){
            this.tableaux_initialisation.push(i);
            this.tableaux_initialisation.push(i);
        }
    }
  
    melanger_le_tableau(){
        this.tableaux_initialisation.sort(()=> Math.random()-0.5);
    }
    shuffle() {
        this.melanger_le_tableau();
        
        const liste = document.getElementById("list");
        let ligne = '';
        for (let i = 1; i <= ((this.size) * 2); i++) {
            if ((i - 1) % 4 === 0) {
                ligne += '<div class="flex-row">';
            }
            ligne += '<div class="flex-item"><a href="#"><img id="item' + i + '" width="50%" onclick="game.showCard(' + i + ')" src=""></a></div>';
            if (i % 4 === 0 || i === ((this.size) * 2)) {
                ligne += '</div>';
            }
        }
        liste.innerHTML = ligne;
        for (let i = 1; i <=  ((this.size) * 2); i++) {
            let img = document.getElementById(`item${i}`);
            if (img) {
                img.src = "images/image_jeu/im"+ this.tableaux_initialisation[i-1] +".png";
                console.log(this.tableaux_initialisation.length)
            }
        }
    }
    hidden(){
        for (let i = 1; i <= ((this.size) * 2); i++) {
            let img = document.getElementById(`item${i}`);
            if (img) {
                img.src="images/interro.jpg";
            }
        }
    }
    Play(){
        this.init();
        this.shuffle();
    }
    constructor(size=4){
        this.size=size;
        this.tableaux_initialisation = [] ;
        this.image1="";
        this.image2="";
        this.nombre_de_click=0;
        this.debut=true;
        this.position1=0;
        this.position2=0;
        this.id1 ="";
        this.id2 ="";
        this.temps = document.getElementById("valeurs_temps").value;
        this.intervale="";
        this.score=0;
        this.life=7;
    }
    showCard(id){
      
      if(this.debut == true){
        document.getElementById("life").innerHTML='  Nombre de tentative : ' + this.life ;
        this.nombre_de_click++;
        document.getElementById("score").innerHTML=' Score : '+ this.score;     
        let image = document.getElementById(`item${id}`);
        image.src= "images/image_jeu/im"+ this.tableaux_initialisation[id-1] +".png";
        if(this.nombre_de_click==1){
            this.image1="images/image_jeu/im"+ this.tableaux_initialisation[id-1]+".png";
            this.position1=id;
        }
        else {
            this.image2 ="images/image_jeu/im"+this.tableaux_initialisation[id-1]+".png";
            this.position2=id;
        }
  
        if(this.position1!=this.position2 && this.nombre_de_click >1) {
            this.debut=false;
            if(this.image1!=this.image2){
                this.life --;
                document.getElementById("life").innerHTML='  Nombre de tentative : ' + this.life;
                setTimeout(() =>{
                    let card1 = document.getElementById(`item${this.position1}`)
                    if (card1) card1.src="images/interro.jpg";
                    let card2 = document.getElementById(`item${this.position2}`)
                    if (card2) card2.src="images/interro.jpg";
                    this.debut=true; 
                    this.nombre_de_click=0;
                    this.image1="";
                    this.image2="";
                    this.position1=0;
                    this.position2=0;
                 }
                 ,1000);
            }  
            else{ 
                this.debut=true;
                this.nombre_de_click=0;
                this.score ++;
                document.getElementById("score").innerHTML=' Score : '+ this.score;
            }
        }  
        else {
            if(this.nombre_de_click==2){
                this.nombre_de_click=1;
            } 
        }
  
    }
    if (this.life==0){
            this.temps=0;
            if( document.getElementById("valeurs_temps"))
            document.getElementById("valeurs_temps").innerHTML="0";
            this.debut==false;
    }
    if (this.score == this.size) {
        let messageElement = document.getElementById("list");
        messageElement.innerHTML = "GAGNE";
        messageElement.style.display = "flex";
        messageElement.style.justifyContent = "center";
        messageElement.style.alignItems = "center";
        messageElement.classList.add("highlight-animation");
        messageElement.classList.add("vibrate-animation");
        messageElement.classList.add("green-text");
        // Ajouter la classe CSS pour l'animation de surbrillance et de rebondissement
        messageElement.classList.add("highlight-bounce");
    }   
    }
    hideCard(id){
        let image = document.getElementById(`item${id}`);
        image.src="images/interro.jpg";
    }
    resetChoice(){
        this.premierchoix=null;
        this.deuxiemechoix=null;
    }
    managerTimer(){
        if(this.temps > 0){
            this.temps --;
            document.getElementById("timer").style.display = "none";
            document.getElementById("timer2").innerHTML=' Temps ecoulé : <strong> ' + this.temps + '</strong>';
        }
        if (this.temps == 0) {
            let messageElement = document.getElementById("list");
            messageElement.innerHTML = "PERDU !!!";
            messageElement.style.display = "flex";
            messageElement.style.justifyContent = "center";
            messageElement.style.alignItems = "center";
            
            // Ajouter les classes CSS pour les animations
            messageElement.classList.add("highlight-animation");
            messageElement.classList.add("vibrate-animation");
            messageElement.classList.add("red-text");
            
            // Supprimer les classes CSS après un court délai pour réinitialiser les animations
            setTimeout(function() {
            messageElement.classList.remove("highlight-animation");
            messageElement.classList.remove("vibrate-animation");
            }, 2000);
        }
   }
   HIDEN(){
        this.hidden();
   }
}
var game;  