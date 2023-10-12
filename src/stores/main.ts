import { defineStore } from 'pinia';
import { User, AuthResponse } from '@/interfaces';

export const useMainStore = defineStore({
    id: 'main',

    state: (): {
        user: User | null;
        token: string;
    } => ({
        user: null,
        token: "",
    }),

    actions: {
        loginUser(AuthResponse: AuthResponse) {
            this.user = AuthResponse.user;
            this.token = AuthResponse.token;
        },

        logoutUser() {
            this.user = null;
            this.token = "";
        }
    },
    persist: true
});