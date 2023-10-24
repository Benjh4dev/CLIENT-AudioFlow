import { defineStore } from 'pinia';
import { User, Song,  StoreUser, DecodedToken } from '@/interfaces';
import router from '@/router';
import jwtDecode from "jwt-decode";

export const useMainStore = defineStore({
    id: 'main',

    state: (): {
        user: User | null;
        token: string;
        song_playing: Song | null;
    } => ({
        user: null,
        token: "",
        song_playing: null,
    }),

    actions: {
        loginUser(data: StoreUser) {
            this.user = data.user;
            this.token = data.token;
            router.push('/');
        },
        logoutUser() {
            this.user = null;
            this.token = "";
            router.push('/');
            window.location.reload();
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

        playSong(song: Song) {
            this.song_playing = song;
        }
    },
    persist: true
});