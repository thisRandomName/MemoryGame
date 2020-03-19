let order=[];
let playOrder=[];  //order the player presses the colours
let flash;  //number of flashes appeared in the game
let turn;  //what turn we are on
let good; //boolean, whether the player is correct/wrong
let compTurn; //boolean, computer's turn or not
let intervalid;
let on=false; //power off
let win; //whether player wins or not

const turnCounter = document.querySelector("#turn");
const topLeft=document.querySelector("#topleft");
const topRight=document.querySelector("#topright");
const bottomLeft=document.querySelector("#bottomleft");
const bottomRight=document.querySelector("#bottomright");
const onButton=document.querySelector("#on");
const startButton=document.querySelector("#start");

//pass the parameter 'event' in the arrow function although we don't use it inside the function
onButton.addEventListener('click',(event)=>{
    if (onButton.checked==true){  //checked attribute 
        on=true;
        turnCounter.innerHTML="-";
    }else{
        on=false;
        turnCounter.innerHTML=""; //empty
        clearColour();
        clearInterval(intervalid);
    
    }
})


startButton.addEventListener('click',(event)=>{
    if(on==true || win==true){
        play();
    }
})


//here we define functions:

function play(){
    win=false;
    order=[];
    playOrder=[];
    flash=0;
    intervalid=0;
    turn=1;
    turnCounter.innerHTML=1;
    good=true;

    for (let i=0;i<5;i++){  //5 rounds for the win (5 turns)
        order.push(Math.floor(Math.random()*4)+1); //random numbers between 1 and 4 (floor=lowest nearest integer,random=number belongs to[0,1) )
      //  console.log(order);
    }
    compTurn=true; 
    intervalid=setInterval(gameTurn,800); //run gameTurn after 800ms


}

function gameTurn(){
    on=false; //player does not play
    if (flash==turn) { //if number of flashes equals turn , then computer's turn is over
        clearInterval(intervalid);
        compTurn=false;
        clearColour();
        on=true;
    }

    if(compTurn==true){
        clearColour();
        setTimeout(()=>{
            if(order[flash]==1) one();
            if(order[flash]==2) two();
            if(order[flash]==3) three();
            if(order[flash]==4) four();
            flash++; 
        },200); //stop flashing at 200ms

    }
}


function one(){
    topLeft.style.backgroundColor="green";
}

function two(){
    topRight.style.backgroundColor="purple";
}

function three(){
    bottomLeft.style.backgroundColor="orange";
}

function four(){
    bottomRight.style.backgroundColor="blue";
}


function clearColour(){
    topLeft.style.backgroundColor="limegreen";
    topRight.style.backgroundColor="rgb(163, 84, 159)";
    bottomLeft.style.backgroundColor="rgb(216, 162, 112)";
    bottomRight.style.backgroundColor="lightseagreen";
}

function flashColour(){
    topLeft.style.backgroundColor="green";
    topRight.style.backgroundColor="purple";
    bottomLeft.style.backgroundColor="orange";
    bottomRight.style.backgroundColor="blue";
}


//player's actions

topLeft.addEventListener('click',(event)=>{
    if(on==true){
        playOrder.push(1); //player clicks 1
        one();
		check();
        if(win==false){
            setTimeout( ()=>{
                clearColour();
            },300);   
        }
    }

})

topRight.addEventListener('click',(event)=>{
    if(on==true){
        playOrder.push(2); //player clicks 2
        two();
		check();
        if(win==false){
            setTimeout( ()=>{
                clearColour();
            },300);   
        }
    }

})

bottomLeft.addEventListener('click',(event)=>{
    if(on==true){
        playOrder.push(3); //player clicks 3
        three();
		check();
        if(win==false){
            setTimeout( ()=>{
                clearColour();
            },300);   
        }
    }

})

bottomRight.addEventListener('click',(event)=>{
    if(on==true){
        playOrder.push(4); //player clicks 4
       
        four();
		check();
        if(win==false){
            setTimeout( ()=>{
                clearColour();
            },300);   
        }
    }

})


function check(){
    if (playOrder[playOrder.length-1] !== order[playOrder.length-1])  //last player's click is NOT the correct one
        good=false;

    if(playOrder.length==5 && good==true)   //player wins the game after 5 correct rounds
        winGame();
    
    if (good==false){      //player clicks the WRONG colour
        flashColour();
        turnCounter.innerHTML="NO!";
        setTimeout( ()=>{
            turnCounter.innerHTML=turn;   //continue rounds from where we were left
            clearColour();
            compTurn=true;  //computer's turn 
            flash=0;
            playOrder=[];  
            good=true;
            intervalid=setInterval(gameTurn,800); 
        },800);
    
     }

     if(turn==playOrder.length && good==true && win==false){  //continue playing for the win (turn++)
         turn++;
	    
         playOrder=[];
         compTurn=true;  //computer's turn 
         flash=0;
         turnCounter.innerHTML=turn;
         intervalid=setInterval(gameTurn,800);
     }

}

function winGame(){
    flashColour();
    turnCounter.innerHTML="WIN";
    win=true;
}