import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
// import ICredential from "../interfaces/ICredential";


// const arrOfCredentials: ICredential[] = []


export const createCredentialService = async (username: string, password: string): Promise<Credential> => {
    const newCredential = await CredentialModel.create({ username, password })
    await CredentialModel.save(newCredential)
    return newCredential
}

export const verifyCredentialService = async (username: string, password: string): Promise<Credential | string> => {
    const credential = await CredentialModel.findOneBy({ username })

    if(!credential) {
        return "El usuario no existe"
    }

    if(credential.password !== password) {
        return "La contraseña es incorrecta"
    }

    return credential
}