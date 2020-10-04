const {Schema, model} = require('mongoose');


const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'SECRETARY_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

const usuarioSchema = new Schema({

  nombre: { 
      type: String, 
      required: [true, "El nombre es necesario"] 
    },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
  },
  password: { 
      type: String, 
      required: [true, "La contraseña es necesario"] 
    },
  img: { 
      type: String, required: false 
    },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: rolesValidos,
  },
  google: { 
      type: Boolean, default: false 
    },
});

usuarioSchema.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});

module.exports = model('Usuario',usuarioSchema);