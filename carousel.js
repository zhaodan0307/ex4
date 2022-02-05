const imgArr = [
    'https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-1019-22-P6-MVM-Wk1-en.jpg',
    'https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220131-Limited-en1.jpg',
    'https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220131-apple-watch-en.jpg',
    'https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220131-ghostbed-en.jpg',
    'https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220131-pirelli-en.jpg',
    'https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220124-tvs-football-en.jpg'
]
const btnArr = [
    'Member-only Savings',
    'Limited-time Offers',
    'Apple Watch',
    'Ghostbed',
    'Pirelli',
    'Televisions'
]

//obtain nodes
let imgContainer = document.getElementById('imgContainer')
let btnContainer = document.getElementById('btnContainer')

//get button
const start = document.getElementById('start')
const stop = document.getElementById('stop')
const leftBtn = document.getElementById('leftBtn')
const rightBtn = document.getElementById('rightBtn')

//create a objectArray

const carouselArr = []
//2s to slide once
const time = 2000;
let loadDown = false;
let startStatus = true;
//global variable (pointer)
let elementIndex = 0;






//setUp casual array nodes
let setUpCarouselArray = function () {
    for (let i = 0 ; i < imgArr.length ; i++) {
        carouselArr[i] = { order: i , img:imgArr[i] , btn:btnArr[i] }
    }
    carouselArr.forEach((value, index) => {
        //create img nodes and append them to their parent node
        const imgNode = document.createElement('img')
        imgNode.src = value.img
        imgContainer.appendChild(imgNode)
        carouselArr[index].imgNode = imgNode

        //create btn nodes and append them to their parent node
        const btnNode = document.createElement('button')
        btnNode.innerHTML = value.btn

        btnContainer.appendChild(btnNode)
        carouselArr[index].btnNode = btnNode



    })
}

//display one node
const goRight = function (){



    carouselArr.forEach((value, index) => {
        value.imgNode.style.display = 'none'
        value.btnNode.style.background = 'none'
    })
    if( elementIndex >= carouselArr.length){
        elementIndex = 0;
    }

    if(elementIndex !== 0 ){
        loadDown = true;

        for (let child of imgContainer.children) {
           child.style.transform = 'translateX(-1000px)';
           child.classList.remove('img-fadeOutLeft');
            child.classList.remove('img-fadeInLeft');
            child.classList.remove('img-fadeOutRight');
            child.classList.remove('img-fadeInRight');
            child.classList.remove('img-fadeOutLast');
            child.classList.remove('img-fadeInLast');

        }
        document.getElementById('imgContainer').style.flexDirection = 'row'
        carouselArr[elementIndex-1].imgNode.style.display = 'block'
        carouselArr[elementIndex].imgNode.style.display = 'block'

        carouselArr[elementIndex-1].imgNode.classList.add('img-fadeOutLeft')
        carouselArr[elementIndex].imgNode.classList.add('img-fadeInLeft')


    }else{


        imgContainer.style.flexDirection = 'row-reverse'

        carouselArr[carouselArr.length-1].imgNode.style.display = 'block'
        carouselArr[elementIndex].imgNode.style.display = 'block'




        if(loadDown){
            for (let child of imgContainer.children) {
                child.style.transform = 'none';
                child.classList.remove('img-fadeOutLeft');
                child.classList.remove('img-fadeInLeft');
                child.classList.remove('img-fadeOutRight');
                child.classList.remove('img-fadeInRight');
                child.classList.remove('img-fadeOutLast');
                child.classList.remove('img-fadeInLast');
            }

            carouselArr[carouselArr.length-1].imgNode.classList.add('img-fadeOutLeft')
            carouselArr[0].imgNode.classList.add('img-fadeInLeft')

        }


        carouselArr[elementIndex].imgNode.style.display = 'block'

    }


    carouselArr[elementIndex].btnNode.style.background = 'grey'
    elementIndex++;





}


const startNow = function () {
    timer = setInterval(goRight,time)

    start.style.display = 'none'
    stop.style.display = 'block'

    start.removeEventListener('click',startNow)
    imgContainer.removeEventListener('mouseleave',startNow)
}

const stopNow = function () {

    clearInterval(timer)
    start.style.display = 'block'
    stop.style.display = 'none'
    start.addEventListener('click',startNow)

}

const goLeft = function () {


    if(elementIndex>=1 && carouselArr[elementIndex-1].btnNode.style.background === 'grey'){
        elementIndex--;
    }else if(elementIndex===0){
        elementIndex = carouselArr.length
    }

    elementIndex --;

    if(elementIndex < 0){
        elementIndex = carouselArr.length-1
    }
    carouselArr.forEach((value, index) => {
        value.imgNode.style.display = 'none'
        value.btnNode.style.background = 'none'
    })
    for (let child of imgContainer.children) {
        child.style.transform = 'none';
        child.classList.remove('img-fadeOutLeft');
        child.classList.remove('img-fadeInLeft');
        child.classList.remove('img-fadeOutRight');
        child.classList.remove('img-fadeInRight');
        child.classList.remove('img-fadeOutLast');
        child.classList.remove('img-fadeInLast');
    }

    if(elementIndex !== carouselArr.length-1){

        document.getElementById('imgContainer').style.flexDirection = 'row'
        carouselArr[elementIndex].imgNode.style.display = 'block'
        carouselArr[elementIndex+1].imgNode.style.display = 'block'
        carouselArr[elementIndex].imgNode.classList.add('img-fadeInRight')
        carouselArr[elementIndex+1].imgNode.classList.add('img-fadeOutRight')
    }else{
        for (let child of imgContainer.children) {
            child.style.transform = 'none';
            child.classList.remove('img-fadeOutLeft');
            child.classList.remove('img-fadeInLeft');
            child.classList.remove('img-fadeOutRight');
            child.classList.remove('img-fadeInRight');
            child.classList.remove('img-fadeOutLast');
            child.classList.remove('img-fadeInLast');
        }
        carouselArr[elementIndex].imgNode.style.display = 'block'
        carouselArr[0].imgNode.style.display = 'block'
        document.getElementById('imgContainer').style.flexDirection = 'row-reverse'
        carouselArr[elementIndex].imgNode.style.transform = 'translateX(1000px)'
        carouselArr[0].imgNode.style.transform = 'translateX(1000px)'
        carouselArr[elementIndex].imgNode.classList.add('img-fadeInRight')
        carouselArr[0].imgNode.classList.add('img-fadeOutRight')




    }



    carouselArr[elementIndex].btnNode.style.background = 'grey'
}






//set timer to let the displayImg function execute in every 1s
setUpCarouselArray()
//start first
goRight()
//after 2000ms,
let timer = setInterval(goRight,time)

//set listener
start.addEventListener('click',()=>{
    startNow()
    startStatus = true;
})
stop.addEventListener('click',()=>{
    startStatus = false;
    stopNow()
})
imgContainer.addEventListener('mouseenter',stopNow)
imgContainer.addEventListener('mouseleave',()=>{
    if(startStatus){
        startNow()
    }
})

carouselArr.forEach((value, index) => {
    value.btnNode.addEventListener('click',()=>{
        stopNow()
        elementIndex = index;
        goRight()

    })
})

leftBtn.addEventListener('click',()=>{
    startStatus = false;
    stopNow()
    goLeft()
})
rightBtn.addEventListener('click',()=>{
    startStatus = false;
    stopNow()
    goRight()


})



