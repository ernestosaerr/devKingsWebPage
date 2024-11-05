//todo este codigo lo puse para que el carrusel funcione
let currentIndex = 0;
const images = document.querySelectorAll(".carousel-image");

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

setInterval(nextImage, 3000); 


//si ocupan codigo para conectar a la base agreguenlo despues de esta linea 