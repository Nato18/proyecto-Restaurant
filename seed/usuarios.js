import bcrypt from 'bcrypt'
const usuarios = [
    {
        nombre: 'renato',
        email: 'nato@nato.com',
        confirmado: 1,
        telefono: 12345678,
        contrasena: bcrypt.hashSync('contrasena',10)
    },
    {
        nombre: "renato Admin",
        email: "nato@admin.com",
        confirmado: 1,
        telefono: 12345678,
        contrasena: bcrypt.hashSync('adminadmin',10),
        admin: true
    }
]

export default usuarios