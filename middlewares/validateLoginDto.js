import { Type } from "@sinclair/typebox";
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import Ajv from "ajv";

const LoginDTOSchema = Type.Object(
    {
        email: Type.String({
            format: 'email',
            errorMessage: {
                type: "El tipo de email debe ser string",
                format: "El correo no es valido"
            }
        }),
        password: Type.String({
            errorMessage: {
                type: 'El tipo de password debe ser string'
            }
        }),
    }, 
    { 
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "El formato del objeto no es valido",
        }
    }
);



const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ['email']);
addErrors(ajv);
const validate = ajv.compile(LoginDTOSchema)

export const validateLoginDTO = ( req, res, next ) => {
    
    const isDTOValid = validate( req.body )

    if (!isDTOValid) return res
        .status(400)
        .send({
            ok: false,
            message: ajv.errorsText(validate.errors, { separator: "\n" })
        });

    next();
}

// Validacion manual

// const DTO_PROPERTY_NAMES = [ 'email', 'password' ]


    // if(typeof loginDto !== 'object') {
    //     return res.status(400).send({
    //         ok: false,
    //         message: "El body debe venir en formato JSON"
    //     })
    // } 

    // const bodyPropertyNames = Object.keys(loginDto);

    // const checkProperties = bodyPropertyNames.length === DTO_PROPERTY_NAMES.length && bodyPropertyNames.every(bodyPropertyName => DTO_PROPERTY_NAMES.includes(bodyPropertyName) );

    // if (!checkProperties) res.status(400).send({
    //     ok: false,
    //     message: 'El body solo debe contener email y password'
    // });


    //LOGIN SCHEMA MANUAL

    
// const LoginDTOSchema = {
//     type: 'object',
//     properties: {
//         email: { type: "string", format: "email" },
//         passwowrd: { type: "string" },
//     },
//     required: ['email', 'password'],
//     additionalProperties: false,
// }