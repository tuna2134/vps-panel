import { atom } from "jotai";

interface User {
    id: number;
    username: string;
    avatar_url?: string;
    email?: string;
}

export const user = atom<User | null>(null);
