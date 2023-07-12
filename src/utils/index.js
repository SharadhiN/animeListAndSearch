import { LOCAL_STORAGE_KEY_WELCOME_MODAL } from "./constants";

export const setLocalStorageItem = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
}

export const getLocalStorageItem = name => {
    const data = localStorage.getItem(name);
    if (data) {
        return JSON.parse(data);
    }
    return null;
}