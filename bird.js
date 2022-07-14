const birdElem = document.querySelector("[data-bird")
//getting the birdElement from HTML
let timeSinceLastJump=Number.POSITIVE_INFINITY;
const jumpDuration = 200 //our jump will last for 125 milliseconds
//on clicking spacebar for one time, our jump will last for 125 ms
const bird_speed = 0.3;

export function setUpBird(){
    timeSinceLastJump=Number.POSITIVE_INFINITY;
    setTop(window.innerHeight/2)
    // console.log(getTop())
    //so that the bird starts from the mid of the page

    document.removeEventListener("keydown",handleJump)
    //pehle remove kr de re h bcoz jab game restart kre to pareshani na ho
    //to utna bar space dbaana pdega resatrt krne k liye jitna bar game restart ho chuka h
    //isse achha har game se phle event listener hata dee
    document.addEventListener("keydown",handleJump)
}
export function getBirdRect(){
    return birdElem.getBoundingClientRect()
    //this returns the bird element top,right,left, bottom positions

}
export function updateBird(delta){
    //function to update Bird's position
    // console.log(timeSinceLastJump)
    // console.log(jumpDuration)
    if(timeSinceLastJump< jumpDuration){
        setTop(getTop()-bird_speed*delta); 
    }
    else{
        setTop(getTop()+bird_speed*delta); 
    }
    timeSinceLastJump += delta
    //
    // console.log(getTop());
// console.log(getTop());  :- by using this we can print the current top value of bird


}

function setTop(top){
    birdElem.style.setProperty("--bird-top", top)
    //top value ko set kr re h in attribute which was our variable --bird top
    // assigning the value = top 
}

function getTop(){
    return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"));
//we need to parse this as float because it should be number and not a string to add the speed of bird 
}

function handleJump(e){
    if (e.code !=='Space') return

    timeSinceLastJump = 0;
    //space dabane par bird ka timeSinceLastJump 0 ho jaye 
    // aur aage jo v movement ho wo ab bird k av k current position se ho 
}