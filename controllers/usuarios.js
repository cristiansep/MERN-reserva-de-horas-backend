const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require("../models/usuario");



const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google");

  res.json({
    ok: true,
    usuarios,
    uid: req.uid
  });
};



const crearUsuario = async (req, res) => {

  const { email, password} = req.body;


  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Este correo ya a sido registrado",
      });
    }

    const usuario = new Usuario(req.body);


    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    // Guardar usuario
    await usuario.save();

    // Generar TOKEN
    const token = await generarJWT(usuario.id);


    res.json({
      ok: true,
      usuario,
      token
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};


const actualizarUsuario = async(req,res) => {

    const uid = req.params.id;
    

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuaio con ese Id'
            });
        }

      
        // Actualizaciones
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail) {
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });
    }

};


const borrarUsuario = async(req, res) => {

  const uid = req.params.id;

  try {

    const usuarioDB = await Usuario.findById(uid);

    if(!usuarioDB) {
        return res.status(404).json({
            ok:false,
            msg: 'No existe un usuaio con ese Id'
        });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
        ok: true,
        msg: 'Usuario eliminado'
    });
    
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error inesperado'
    });
  }

}

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario
};
