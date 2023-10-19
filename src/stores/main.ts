import { defineStore } from 'pinia';
import { User } from '@/interfaces';
import router from '@/router';
import jwtDecode from "jwt-decode";
import { login as apiLogin } from '@/api/auth';

interface DecodedToken {
    exp: number;
    [key: string]: any;
}

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
        async loginUser(credentials: any) {
            const data = await apiLogin(credentials);
            this.user = data.user;
            this.token = data.token;
            router.push('/');
        },

        logoutUser() {
            this.user = null;
            this.token = "";
            router.push('/');
        },
        verifyTokenValidity() {
            if (!this.token) {
                return false;
            }
    
            const decodedToken: DecodedToken = jwtDecode(this.token);
    
            if (decodedToken.exp * 1000 < Date.now()) {
                this.logoutUser();
                return false;
            }
    
            return true;
        },
    },
    persist: true
});