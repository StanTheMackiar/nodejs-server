import { DBUSERS } from "../db.js";


export const matchEmailPassword = ( email, password ) => {

    const dbUser = DBUSERS.find( user => user.email === email )
    if ( !dbUser ) throw new Error();

    if ( dbUser.password !== password ) throw new Error();

    return dbUser;

}