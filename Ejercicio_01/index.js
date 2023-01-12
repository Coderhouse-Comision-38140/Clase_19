/* Importar dependencias */
import mongoose from 'mongoose'

// Instanciamos nuestro schema
const Schema = mongoose.Schema

/* 
Definimos el esquema de documento y del modelo
Para poder interacturar con la base de datos: leer, escribir, listar, actualizar, etc
*/

const estudianteSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    dni: {type: String, required: true, unique: true},
    curso: {type: String, required: true},
    nota: {type: Number, required: true},
    // Agregar al schema actual
    ingreso: {type: Boolean, default: false}
})

const estudiantesDAO = mongoose.model('estudiantes', estudianteSchema)

/* ------------------------------------------------------------------ */
/*              Conexión a la base de datos: Colegio                  */
/* ------------------------------------------------------------------ */

await mongoose.connect('mongodb://127.0.0.1/colegio', {
    serverSelectionTimeoutMS: 5000,
})
console.log('Base de datos conectada');

try {
    console.log("Actualizar DNI de Lucas Blanco")
    let rta = await estudiantesDAO.updateOne({
        nombre: 'Lucas',
        apellido: 'Blanco'
    }, { $set: {dni: 20355875} })
    console.log(rta) 
}