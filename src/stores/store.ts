import axios from 'axios';
import { defineStore } from 'pinia';
import { User, Song, UserPlaylist, Player } from '@/interfaces';

export const useStore = defineStore({
    id: 'mainStore',

    state: (): {
        user: User | null;
        songs: Song[];
        playlists: UserPlaylist[];
        player: Player;
    } => ({
        user: null,
        songs: [],
        playlists: [],
        player: {
            queue: [],
            currentTrackIndex: 0,
            currentTime: 0,
            volume: 100
        }
    }),

    actions: {
        async loginUser(credentials: { username: string; password: string }) {
            const response = await axios.post('YOUR_ENDPOINT_FOR_LOGIN', credentials);
            this.user = response.data as User;
        },

        async logoutUser() {
            this.user = null;
        },

        async fetchUserSongs() {
            if (this.user && this.songs.length === 0) {
                const response = await axios.get(`YOUR_ENDPOINT_FOR_SONGS?userId=${this.user.id}`);
                this.songs = response.data.slice(0, 10) as Song[];
            }
        },

        async fetchUserPlaylists() {
            if (this.user && this.playlists.length === 0) {
                const response = await axios.get(`YOUR_ENDPOINT_FOR_PLAYLISTS?userId=${this.user.id}`);
                this.playlists = response.data as UserPlaylist[];
            }
        }
    }
});
