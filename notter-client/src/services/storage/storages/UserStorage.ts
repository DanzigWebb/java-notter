import { AbstractStorage } from '../AbstractStorage';
import { StorageKeyEnum } from '../StorageKeyEnum';

export type UserStorageState = {
    isAuth: boolean;
}

class UserStorage extends AbstractStorage<UserStorageState> {}

export const userStorage = new UserStorage(
    localStorage,
    StorageKeyEnum.USER
);