 import {updateBird,setUpBird,getBirdRect} from './bird.js'
 import {updatePipes,setUpPipes,getPipesCount, getPipeRects} from './Pipe.js'
 let currentScore = document.getElementById('scoreboard');
 document.addEventListener("keypress",handleStart,{once:true}) 

//  Any time we press a key, for once in a while it calls the function handleStart
// var ab = document.getElementById("uniqueID").value;
// console.log(ab);
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime
function updateLoop(time){
    if(lastTime==null){
        lastTime=time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = (time-lastTime); //delta = time b/w two animation frames
    updateBird(delta);
    updatePipes(delta);
    //Note :- first value iska NaN aayga bcoz initially lastTime is not assigned any value
    //uske bad lastTime gets updated and thus we are printing the difference between curent 
    // time and last time, thus giving us the frame change time . So, initial k liye alag krdege define
    
    if(checkLose())return handleLose();
//checks if lose then returns handleLose
    lastTime=time;

    

    //Note :- if delta value more, bird should move more distance
    // if delta value less , bird should move less distance
    //So, delta is important for bied movement

    // updating the lastTime afte evry update of loop
    window.requestAnimationFrame(updateLoop);
    //kab kab hmara frame update ho ra h , wo sara time

}

function isCollsion(rect1,rect2){
    return(
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )

}

function checkLose(){
    const birdRect = getBirdRect();
    const insidePipe = getPipeRects().some(rect=> isCollsion(birdRect,rect))
    const outsideWorld = birdRect.bottom>window.innerHeight || birdRect.top<0
    return outsideWorld || insidePipe
}

 function handleStart(){
    title.classList.add('hide');
    currentScore.innerText='Current Score : 0'
    //As son as we press any key and start our game , the title gets disappeared
    //Now, we need to start our game
    setUpBird()
    setUpPipes()
    //calling the setUpBIrd at the start of the game to initialize the position of the bird
    lastTime=null
    //very very important ****
    //it is important to set lastTime value to null taki kch weird calculation na hota rahe
        window.requestAnimationFrame(updateLoop)
    //Many people use setInterval and setTimeout but they don't give accurate results,
    // so, use this window.requestAnimationFrame


 }

 function handleLose(){
    document.getElementById('end').play();
    setTimeout(()=>{
        title.classList.remove("hide");
        subtitle.classList.remove("hide");
        subtitle.textContent=`Score : ${getPipesCount()}`;
        document.addEventListener("keypress",handleStart,{once:true})
        
    },500)
   
 }