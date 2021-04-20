var  canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Function to load image from source file
let loadImage=(src,callback)=>{
 let img = document.createElement("img");
 img.onload=()=> callback(img);
 img.src =src;
};

// Function to return address of images on the basis of frame Number and animation type
let imagePath=(frameNumber,animation)=>{
    return "images"+"/" + animation+ "/" +String(frameNumber)+".png";
};

// Object of Frames of each animation type.
let frame ={
    backward: [1, 2, 3, 4, 5, 6],
    forward : [1, 2, 3, 4, 5, 6],
    kick  :   [1, 2, 3, 4, 5, 6, 7],
    punch :   [1, 2, 3, 4, 5, 6, 7],
    idle  :   [1, 2, 3, 4, 5, 6, 7, 8],
    block :   [1,2, 3, 4, 5, 6, 7, 8, 9],
}
let loadImages=(callback)=>{
    let images = {idle:[],kick:[],punch:[],backward:[],forward:[],block:[]};
    let imagesToLoad =0;
    ["idle","kick","punch","block","forward","backward"].forEach((animation)=>{
        
        let animationFrames = frame[animation];
        imagesToLoad = imagesToLoad + animationFrames.length; 
        animationFrames.forEach((frameNumber)=>{
            let path = imagePath(frameNumber,animation); 
            loadImage(path,(image)=>{ 
              images[animation][frameNumber-1] = image;
              imagesToLoad = imagesToLoad-1;
              if(imagesToLoad ===0){
                callback(images);
                };
            });
        });
    });
};

// Animation
let x = 0;
let animate = (ctx,images,animation,callback)=>{ 
    images[animation].forEach((image, index)=>{
        setTimeout(()=>{
            ctx.clearRect(x,0,700,600);
            
            ctx.drawImage(image,x,0,700,600);
        }, index*100);
        
   });
   setTimeout(callback,images[animation].length*100);
};

//Draw Images
loadImages((images)=>{
    let queueAnimation =[];

    let aux =()=>{
        let selectedAnimation;
        if(queueAnimation.length === 0){
            selectedAnimation ="idle";
        }
        else{
            selectedAnimation = queueAnimation.shift();
        }

        animate(ctx, images, selectedAnimation, aux);
    };

    aux();

    document.getElementById("Kick").onclick=() => {
        queueAnimation.push("kick");
    };
    document.getElementById("Punch").onclick = () =>{
     
        queueAnimation.push("punch");
    };
    document.getElementById("Block").onclick = () =>{
     
        queueAnimation.push("block");
    };
    document.getElementById("Forward").onclick = () =>{
        if(x <= 130){
            x= x+50;
        }
        else {
            x=180;
        }
        queueAnimation.push("forward");
    };
    document.getElementById("Backward").onclick = () =>{ 
        if(x >= 50){
            x = x-50;
        }
        else{
            x=0;
        }
        queueAnimation.push("backward");
    };
    


    document.addEventListener("keyup", (event)=>{
        const key = event.key; //ArrowRight, ArrowLeft ArrowUp, arrowDown 

        if(key ==="ArrowLeft"){
            queueAnimation.push("backward");
        }
        if(key === "ArrowRight"){
            queueAnimation.push("forward");
        }
        if(key === "ArrowUp"){
            queueAnimation.push("kick");
        }
        if(key === "ArrowDown"){
            queueAnimation.push("punch");
        }
    }) 
    
});
