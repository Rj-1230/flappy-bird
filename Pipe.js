const holeHeight=180;
const pipeWidth = 60;
let pipes=[]
const pipeSpeed=0.75
const pipeInterval = 1500
let timeSinceLastPipe =0 
let passedPipesCount=0
let currentScore = document.getElementById('scoreboard');

function createPipe(){
    //index.html se pipe wala div hata skte h bcoz we are dynamically creating pipes here
    const pipeElem=document.createElement("div")
    const topELement = createPipeSegment("top");
    const bottomELement = createPipeSegment("bottom");
    pipeElem.append(topELement);
    pipeElem.append(bottomELement);
    pipeElem.classList.add("pipe")
    pipeElem.style.setProperty("--hole-top",
    randomNumberBetween(holeHeight*1.5,window.innerHeight-holeHeight*0.5))

    const pipe ={
        get left(){
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--pipe-left"))
        },

        set left(value){
            pipeElem.style.setProperty("--pipe-left",value)
        },
        remove(){
            pipes=pipes.filter(p=> p!==pipe)
            pipeElem.remove()
        },

        rects(){
            return[
                topELement.getBoundingClientRect(),
                bottomELement.getBoundingClientRect()
            ]
        }
    }

    pipe.left=window.innerWidth;
    document.body.append(pipeElem)
    pipes.push(pipe);
}

export function getPipeRects(){
    return pipes.flatMap(pipe=>pipe.rects())
}


export function setUpPipes(){
    document.documentElement.style.setProperty("--pipe-width", pipeWidth);
    document.documentElement.style.setProperty("--hole-height", holeHeight);
    timeSinceLastPipe=pipeInterval;
    pipes.forEach(pipe=>pipe.remove())
    passedPipesCount=0
}

function createPipeSegment(position){
    const segment = document.createElement("div")
    segment.classList.add("segment",position);
    return segment;
}


function randomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

export function getPipesCount(){
    return passedPipesCount
}

export function updatePipes(delta){
    timeSinceLastPipe+=delta

    if(timeSinceLastPipe>pipeInterval){
        timeSinceLastPipe-=pipeInterval;
        createPipe()
    }

    pipes.forEach(pipe=>{
        if(pipe.left+pipeWidth<0){
            passedPipesCount++
            currentScore.innerText=`Current Score : ${passedPipesCount}`
            document.getElementById('cross').play();
            return pipe.remove()
        }
        pipe.left-=delta*pipeSpeed
    })
}
