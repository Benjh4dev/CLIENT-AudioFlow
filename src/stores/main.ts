import { defineStore } from 'pinia';
import { User, Song, Playlist, StoreUser, DecodedToken } from '@/interfaces';
import router from '@/router';
import jwtDecode from "jwt-decode";
import { usePlayerStore } from './player';

export const useMainStore = defineStore({
    id: 'main',

    state: (): {
        user: User | null;
        token: string;
        mySongs: Song[];
        systemSongs: Song[];
        playlists: Playlist[];
    } => ({
        user: null,
        token: "",
        mySongs: [],
        systemSongs: [],
        playlists: [],
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
            this.mySongs = [];
            this.playlists = [];
            router.push('/');
            window.location.reload();
        },
        verifyTokenValidity() {
            const playerStore = usePlayerStore();

            if (!this.token) {
                return false;
            }
    
            const decodedToken: DecodedToken = jwtDecode(this.token);
    
            if (decodedToken.exp * 1000 < Date.now()) {
                this.logoutUser();
                playerStore.destorePlayer();
                return false;
            }
    
            return true;
        },


        loadMySongs(songs: Song[]) {
            this.mySongs = songs;
        },
        loadSongs(songs: Song[]) {
            this.systemSongs = songs;
        },
        loadUserPlaylists(playlists: Playlist[]) {
            this.playlists = playlists;
        },
        addSystemSong(song: Song) {
            this.systemSongs.push(song);
            this.mySongs.push(song);
        },
        addSystemPlaylist(playlist: Playlist) {
            this.playlists.push(playlist);
        },
        clearSystemSongs() {
            this.systemSongs = [];
        },
        clearMySongs() {
            this.mySongs = [];
        },
        deleteSystemSong(song: Song) {
            this.systemSongs = this.systemSongs.filter(s => s.id !== song.id);
            this.mySongs = this.mySongs.filter(s => s.id !== song.id);
        }
    },
    persist: true
});