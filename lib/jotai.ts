import { atom } from "jotai";

interface User {
    id: string;
    username: string;
    avatar_url?: string;
    email?: string;
}

export const user = atom<User | null>(null);
