const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Middleware para procesar JSON del body

// Aquí importaremos las rutas más adelante
const jugadoresRoutes = require('./routes/jugadores');
app.use('/api/jugadores', jugadoresRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
});