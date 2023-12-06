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
        myPlaylists: Playlist[];
        systemSongs: Song[];
        systemPlaylists: Playlist[];
    } => ({
        user: null,
        token: "",
        mySongs: [],
        myPlaylists: [],
        systemSongs: [],
        systemPlaylists: []
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
            this.myPlaylists = [];
            this.systemPlaylists = [];
            router.push('/');
            setTimeout(() => {
                window.location.reload();
            }, 50);
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
        loadSongs(songs: Song[]) {
            this.systemSongs = songs;
        },
        loadMySongs(songs: Song[]) {
            this.mySongs = songs;
        },
        loadMyPlaylists(playlists: Playlist[]) {
            this.myPlaylists = playlists;
        },
        addSystemSong(song: Song) {
            this.systemSongs.push(song);
            this.mySongs.push(song);
        },
        addSystemPlaylist(playlist: Playlist) {
            this.systemPlaylists.push(playlist);
            this.myPlaylists.push(playlist);
        },
        clearMySongs() {
            this.mySongs = [];
        },
        clearSystemSongs() {
            this.systemSongs = [];
        },
        clearSystemPlaylist() {
            this.systemPlaylists = [];
        },
        deleteSystemSong(song: Song) {
            this.systemSongs = this.systemSongs.filter(s => s.id !== song.id);
            this.mySongs = this.mySongs.filter(s => s.id !== song.id);
        },
        deleteSystemPlaylist(id: string) {
            this.myPlaylists = this.myPlaylists.filter(p => p.id !== id);
            this.systemPlaylists = this.systemPlaylists.filter(p => p.id !== id);
        }
    },
    persist: true
});