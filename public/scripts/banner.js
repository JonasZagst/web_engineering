function switchBannerImageAfterTime(){
    console.clear()
    let image = document.getElementById("LandingBannerImage").src;
    const images = ["http://localhost:3000/img/banner.png","http://localhost:3000/img/banner2.jpeg","http://localhost:3000/img/banner3.jpeg"]; 

    let index = 0;
    let currentImage=0;

    images.forEach((element) =>{
        if(element==image)
        {   
            currentImage= index;
        } 
        else{
            console.log("false")
        }
        index++;
    });

    if(currentImage==2)
    {
        currentImage=0;
    }
    else{
        currentImage= currentImage+1;
    }
    document.getElementById("LandingBannerImage").src = images[currentImage];
}