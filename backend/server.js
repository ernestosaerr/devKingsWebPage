const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importación de CORS

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Configuración de CORS

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
    res.json({ message: '¡El servidor está funcionando!' }); // Respuesta como JSON
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al registrar usuario' });
        }
        res.status(200).json({ success: true, message: 'Usuario registrado exitosamente' });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            return res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
        }
        if (results.length > 0) {
            res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
        } else {
            res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
