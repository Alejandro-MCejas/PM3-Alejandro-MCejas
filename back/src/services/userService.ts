// import IUser from "../interfaces/IUser";
import UserDto from "../dto/UserDto";
import { createCredentialService } from "./credentialService";
import { UserModel } from "../config/data-source";
import { User } from "../entities/User";

// const arrOfUsers: IUser[] = [];


export const getUsersService = async (): Promise<User[]> => {
    const users: User[] = await UserModel.find({ order: { id: "ASC" }, relations: { appointments: true, credentials: false } });
    return users;
}

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const findUser = await UserModel.findOne({
        where: { id },
        relations: { appointments: true, credentials: false }
    });
    return findUser
}

export const createUserService = async (user: UserDto, username: string, password: string): Promise<User> => {

    const newCredentialsId = await createCredentialService(username, password);

    const newUser = await UserModel.create({ ...user, credentials: newCredentialsId });
    await UserModel.save(newUser);
    return newUser
}