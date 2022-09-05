import bcrypt from 'bcrypt'
const usuarios = [
    {
        nombre: 'renato',
        email: 'nato@nato.com',
        confirmado: 1,
        contrasena: bcrypt.hashSync('contrasena',10)
    }
]

export default usuarios