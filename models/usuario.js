const {Schema, model} = require('mongoose');


const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'SECRETARY_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

const UsuarioSchema = new Schema({

  nombre: { 
      type: String, 
      required: true
    },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: { 
      type: String, 
      required: true
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

UsuarioSchema.method('toJSON', function() {
    const {__v, _id, password,...object} = this.toObject();
    return object;
})


// usuarioSchema.plugin(uniqueValidator,{message: '{PATH} debe ser unico'});

module.exports = model('Usuario',UsuarioSchema);