import { User } from '../types/User';
import Storage from '../utils/Storage';
import { StorageType } from './localdata';

export const loginCheck = (id: string, password: string): Promise<boolean> => {
    console.log("Call")
    const user = Storage.getJSON<User[]>(StorageType.Login)?.find((u) => 
        u.id === id && u.password === password
    );
    return Promise.resolve(user !== undefined);
}
