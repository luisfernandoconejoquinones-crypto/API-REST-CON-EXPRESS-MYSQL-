let express = require("express");
let cors = require("cors");
let mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

//conexion con la base de datos 
let conectar = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1063*Fc",
    database: "inventario",
    port: 3306
});

conectar.connect((error) => {
    if (error) {
        console.log("Error de conexión a la base de datos: ");
    } else {
        console.log("Conexión exitosa a la base de datos ");
    }
});

app.get("/prueba", (req, res) => {
    res.json({ "mensaje": "Servidor funcionando correctamente" });
});


app.post("/productos", (req, res) => {
    const { nombre, categoria, precio, cantidad } = req.body;
    
    conectar.query(
        "INSERT INTO producto (nombre, categoria, precio, cantidad) VALUES (?, ?, ?, ?)",
        [nombre, categoria, precio, cantidad],
        (error, resultado) => {
            if (error) {
                return res.json({ "mensaje": "Error al registrar el producto"});
            } else {
                return res.json({ "mensaje": "Producto registrado correctamente" });
            }
        }
    );
});

app.get("/productos", (req, res) => {
    conectar.query("SELECT * FROM producto", (error, resultado) => {
        if (error) {
            return resjson({ "mensaje": "Error al consultar los productos" });
        } else {
            return res.json(resultado);
        }
    });
});

app.listen(PORT, () => {
    console.log("Servidor en ejecución en el puerto " + PORT);
});