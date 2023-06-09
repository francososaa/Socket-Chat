const { response } = require('express');

const esAdminRol = ( req, res = response, next ) => {

    if ( !req.usuario){
        return res.status(500).json({
            msj: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;    

    if ( rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msj: `${ nombre } no es adminsitrador - No puede hacer esto`
        });
    }

    next();
}

const tieneRol = ( ...roles ) => {

    return ( req, res = response, next  ) => {

        if ( !req.usuario){
            return res.status(500).json({
                msj: 'Se quiere verificar el rol sin validar el token primero'
            })
        }
        
        if ( roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msj: `El servicio requiere uno de estos roles ${ roles }`
            })
        }
        
        next();
    }

}

module.exports = {
    esAdminRol,
    tieneRol
}
