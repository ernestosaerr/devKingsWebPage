// Código del carrusel
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

// Cargar Firebase de manera asíncrona
(async () => {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");
    const { getAuth, signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js");
    const { getFirestore } = await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js");

    // Configuración de Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBima3wGZ9KZ2DD6BED4rwxayW_2hWnpu8",
        authDomain: "petfi-ad146.firebaseapp.com",
        projectId: "petfi-ad146",
        storageBucket: "petfi-ad146.firebasestorage.app",
        messagingSenderId: "209794390077",
        appId: "1:209794390077:web:4cb354ec99046606107254",
        measurementId: "G-H7J28H377M"
    };

    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Obtén referencias a los elementos del formulario
    const loginForm = document.querySelector('form');
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');

    // Maneja el evento de envío del formulario
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = usernameInput.value;
        const password = passwordInput.value;

        // Autentica al usuario con Firebase Authentication
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                // Error en el inicio de sesión
                alert('Error al iniciar sesión: ' + error.message);
            });
    });
})();