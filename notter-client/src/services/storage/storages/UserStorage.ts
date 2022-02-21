import { AbstractStorage } from '../AbstractStorage';
import { StorageKeyEnum } from '../StorageKeyEnum';
import { UserDto } from '../../api/dto';

export type UserStorageState = {
    isAuth: boolean;
    user: UserDto;
    token: string;
}

class UserStorage extends AbstractStorage<UserStorageState> {}

export const userStorage = new UserStorage(
    localStorage,
    StorageKeyEnum.USER
);