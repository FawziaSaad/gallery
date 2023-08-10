var images = [];
var currentIndex = 0;
var timerId;



function init() {
    loadImages();
}

function loadImages() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            images = JSON.parse(this.responseText);
            if (images.length > 0) {
                showImage(0);
                startSlideshow();
            }
        }
    };
    xhr.open("GET", "images1.txt", true);
    xhr.send();
}

function showPrevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    showImage(currentIndex);
}

function showNextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

var flag = true; 

function updateImages() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            images = JSON.parse(this.responseText);
            if (images.length > 0) {
                currentIndex = 0; 
                showImage(0);
                startSlideshow();
            }
        }
    };
    if (flag) {
        xhr.open("GET", "images2.txt", true);
    } else {
        xhr.open("GET", "images1.txt", true);
    }
    xhr.send();
    flag = !flag; 
}

function showImage(index) {
    stopSlideshow();
    var image = images[index];
    $("#image").fadeOut(function() {
      $(this).attr("src", image.src).attr("alt", image.alt).fadeIn();
    });
    startSlideshow();
  }

function startSlideshow() {
    var image = images[currentIndex];
    timerId = setInterval(function() {
        showNextImage();
    }, image.duration * 500); 
}

function stopSlideshow() {
    clearInterval(timerId);
}

document.getElementById("prev-btn").addEventListener("click", showPrevImage);
document.getElementById("update-btn").addEventListener("click", updateImages);
document.getElementById("next-btn").addEventListener("click", showNextImage);

window.onload = init;
