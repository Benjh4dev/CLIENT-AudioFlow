import { defineStore } from 'pinia';
import { Player, Song } from '@/interfaces';
import { loadQueue } from '@/firestore';

export const usePlayerStore = defineStore({
    id: 'player',

    state: (): {
        player: Player;
        lastPlayed: Song[];
        subscribed: boolean;
    } => ({
        player: {
            id: '',
            user_id: '',
            currentSong: null,
            queue: [] as Song[],
            currentTime: 0,
            volume: 100,
            isPlaying: false,
        },
        lastPlayed: [],
        subscribed: false,
    }),

    actions: {
        storePlayer(player: Player) {
            const { id, currentTime, volume, user_id, currentSong, queue } = player;
            this.player.id = id;
            this.player.user_id = user_id;
            this.player.currentSong = currentSong;
            this.player.currentTime = currentTime;
            this.player.volume = volume;
            this.player.queue = queue;
        },
        
        destorePlayer() {
            this.player = {
                id: '',
                user_id: '',
                currentSong: null,
                queue: [] as Song[],
                currentTime: 0,
                volume: 100,
                isPlaying: false,
            };
            this.lastPlayed = [];
        },

        playSong(song: Song) {
            if (this.player && this.player.currentSong) {
                this.lastPlayed.unshift(this.player.currentSong);
                if (this.lastPlayed.length > 5) {
                    this.lastPlayed.pop();
                }
            }
            if (this.player) {
                this.player.currentTime = 0;
                this.player.isPlaying = true;
                this.player.currentSong = song;
            }
        },
        
        addToQueue(song: Song) {
            if (this.player) {
                this.player.queue.push(song);
            }
        },

        nextSong() {
            if (this.player && this.player.queue.length > 0) {
                if (this.player) {
                    this.player.currentTime = 0;
                    this.player.isPlaying = true;
                    this.playSong(this.player.queue.shift()!);
                }
            }
        },        

        prevSong() {
            if (this.lastPlayed.length > 0) {

                if (this.player && this.player.currentSong) {
                    this.player.queue.unshift(this.player.currentSong);
                }
                const previousSong = this.lastPlayed.shift();
                if (previousSong == null) return;
                if (this.player) {
                    this.player.currentTime = 0;
                    this.player.isPlaying = true;
                    this.player.currentSong = previousSong;
                }
            }
        },

        updateCurrentTime(time: number) {
            if (this.player) {
                this.player.currentTime = time;
            }
        },

        updateVolume(volume: number) {
            if (this.player) {
                this.player.volume = volume;
            }
        },
    },
    persist: true
});