// Importar nuestras dependencias
import mongoose, { mongo } from 'mongoose';

// Instanciamos nuestro esquema
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    dni: {
        type: String, unique: true
    }
})
const usuarioModel = mongoose.model('usuarios', usuarioSchema)

// Configurar mongoose para no mostrar warnings de protocolas deprecados
mongoose.set('strictQuery', false);

// Conectarse a la base de datos

try {
    await mongoose.connect("mongodb+srv://admin:coderhouse@cluster0.pqcaluo.mongodb.net/?retryWrites=true&w=majority", {
        serverSelectionTimeoutMS: 5000,
    })
    console.log('Base de datos conectada con exito')

    try {
        // Escritura de la base de datos
        const usuarioNuevo = new usuarioModel({nombre: 'Federico', apellido: 'Perez', dni: '34501380'})
        await usuarioNuevo.save()
        console.log('Usuario agregado!')

        // Listar usuarios representandolos en consola
        let usuarios = await usuarioModel.find({})
        usuarios.forEach(usuario => {
            console.log(JSON.stringify(usuario))
        })
    }
    catch (error) {
        console.log(error)
    }
} catch (error) {
    console.log(error)
}