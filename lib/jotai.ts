import { atom } from "jotai";

interface User {
    id: number;
    username: string;
    avatar_url?: string;
    email?: string;
}

interface UserData {
    user: User | null;
    isLoading: boolean;
}

export const user = atom<UserData>({
    user: null,
    isLoading: false,
});
