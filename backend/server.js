const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agregar aquí la importación de CORS

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Agregar aquí la configuración de CORS

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia 'root' si tu usuario es diferente
    password: '', // Agrega tu contraseña aquí
    database: 'mascotas_db' // Cambia por el nombre de tu base de datos
});

// Conexión a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa con la base de datos');
});

// Rutas
app.get('/', (req, res) => {
    res.send('¡El servidor está funcionando!');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            res.status(500).send('Error al registrar usuario');
            return;
        }
        res.status(200).send('Usuario registrado exitosamente');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            res.status(500).send('Error al iniciar sesión');
            return;
        }
        if (results.length > 0) {
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
