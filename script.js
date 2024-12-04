const breedImages = {
    "Labrador": "https://github.com/ernestosaerr/petfiWebPage/blob/gh-pages/resources/labrador.jpeg?raw=true",
    "Bulldog": "https://raw.githubusercontent.com/ernestosaerr/petfiWebPage/refs/heads/gh-pages/resources/bulldog.jpeg",
    "Beagle": "https://raw.githubusercontent.com/ernestosaerr/petfiWebPage/refs/heads/gh-pages/resources/beagle.jpeg",
    "Poodle": "https://github.com/ernestosaerr/petfiWebPage/blob/gh-pages/resources/poodle.jpeg?raw=true",
    "Rottweiler": "https://github.com/ernestosaerr/petfiWebPage/blob/gh-pages/resources/rottweiler.jpeg?raw=true",
    "Pastor Alemán": "https://github.com/ernestosaerr/petfiWebPage/blob/gh-pages/resources/pastoraleman.jpeg?raw=true",
    "Golden Retriever": "https://github.com/ernestosaerr/petfiWebPage/blob/gh-pages/resources/golden.jpeg?raw=true",
    "Chihuahua": "https://github.com/ernestosaerr/petfiWebPage/blob/gh-pages/resources/chihuahua.jpeg?raw=true",
    "Husky": "https://github.com/ernestosaerr/petfiWebPage/blob/gh-pages/resources/husky.jpeg?raw=true",
    "Doberman": "https://github.com/ernestosaerr/petfiWebPage/blob/gh-pages/resources/doberman.jpeg?raw=true"
};

async function updateFoodWeight() {
    try {
        const response = await fetch('https://02ce-132-247-249-242.ngrok-free.app/get_food_amount', {
            method: "get",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            })
        });

        // Verifica que la respuesta sea exitosa
        if (!response.ok) throw new Error('Error en la solicitud');

        // Imprime el texto completo de la respuesta para inspección
        const text = await response.text();
        console.log("Respuesta del servidor:", text);

        // Intenta convertir a JSON solo si el texto es un JSON válido
        const data = JSON.parse(text);

        const foodWeightElement = document.getElementById('food-weight');
        foodWeightElement.textContent = `${data.food_weight} kg`;
    } catch (error) {
        console.error('Error al obtener el peso de la comida:', error);
    }
}

async function updateTempHumidity() {
    try {
        const response = await fetch('https://02ce-132-247-249-242.ngrok-free.app/get_temp_humidity', {
            method: "get",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            })
        });

        // Verifica que la respuesta sea exitosa
        if (!response.ok) throw new Error('Error en la solicitud');

        // Imprime el texto completo de la respuesta para inspección
        const text = await response.text();
        console.log("Respuesta del servidor:", text);

        // Intenta convertir a JSON solo si el texto es un JSON válido
        const data = JSON.parse(text);

        const temperatureElement = document.getElementById('temperature');
        const humidityElement = document.getElementById('humidity');
        temperatureElement.textContent = `${data.temperature} °C`;
        humidityElement.textContent = `${data.humidity} %`;
    } catch (error) {
        console.error('Error al obtener la temperatura y humedad:', error);
    }
}

async function updatePetNearby() {
    try {
        const response = await fetch('https://02ce-132-247-249-242.ngrok-free.app/is_pet_near', {
            method: "get",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            })
        });

        // Verifica que la respuesta sea exitosa
        if (!response.ok) throw new Error('Error en la solicitud');

        // Imprime el texto completo de la respuesta para inspección
        const text = await response.text();
        console.log("Respuesta del servidor:", text);

        // Intenta convertir a JSON solo si el texto es un JSON válido
        const data = JSON.parse(text);

        const petNearbyElement = document.getElementById('pet-nearby');
        petNearbyElement.textContent = data.pet_near ? 'Sí' : 'No';
    } catch (error) {
        console.error('Error al obtener el estado de la mascota:', error);
    }
}

async function feedPet() {
    const petSize = 'mediano';  // Puedes ajustar esto según la mascota que se desea alimentar (chico, mediano, grande)

    try {
        const response = await fetch('https://02ce-132-247-249-242.ngrok-free.app//feed_pet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420"
            },
            body: JSON.stringify({ pet_size: petSize })  // Enviar el tamaño de la ración
        });

        const data = await response.json();
        alert(data.message);  // Muestra el mensaje de éxito o error
    } catch (error) {
        console.error('Error al alimentar a la mascota:', error);
    }
}

// Llama a las funciones cada 10 segundos para obtener y actualizar los valores
setInterval(updateFoodWeight, 10000);
setInterval(updateTempHumidity, 10000);
setInterval(updatePetNearby, 10000);

// Muestra el formulario para agregar una nueva mascota
document.getElementById('add-pet-button').addEventListener('click', function() {
    document.getElementById('new-pet-form').style.display = 'block';
});

// Agrega una nueva tarjeta de mascota cuando se envía el formulario
document.getElementById('new-pet-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('pet-name').value;
    const age = document.getElementById('pet-age').value;
    const breed = document.getElementById('pet-breed').value;
    const weight = document.getElementById('pet-weight').value;
    const imageUrl = breedImages[breed];

    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.innerHTML = `
        <h2>${name}</h2>
        <img src="${imageUrl}" alt="${breed}" class="pet-image">
        <p><strong>Edad:</strong> ${age} años</p>
        <p><strong>Raza:</strong> ${breed}</p>
        <p><strong>Peso:</strong> ${weight} kg</p>
    `;

    document.querySelector('.cards-container').appendChild(newCard);
    document.getElementById('new-pet-form').reset();
    document.getElementById('new-pet-form').style.display = 'none';
});

// Agrega el evento click al botón de dispensar comida
document.getElementById('dispense-food').addEventListener('click', feedPet);