import { defineStore } from 'pinia';
import { Player, Song } from '@/interfaces';

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
            queue: [],
            currentTime: 0,
            volume: 100,
            isPlaying: false,
        },
        lastPlayed: [],
        subscribed: false,
    }),

    actions: {
        storePlayer(player: Player) {
            const { currentTime, volume, user_id } = player;
            this.player.currentTime = currentTime;
            this.player.volume = volume;
            this.player.user_id = user_id;
        },
        
        destorePlayer() {
            this.player = {
                id: '',
                user_id: '',
                currentSong: null,
                queue: [],
                currentTime: 0,
                volume: 100,
                isPlaying: false,
            };
        },

        playSong(song: Song) {
            const player = this.player;
            if (player && player.currentSong) {
                this.lastPlayed.unshift(player.currentSong);
                if (this.lastPlayed.length > 5) {
                    this.lastPlayed.pop();
                }
            }
            if (player) {
                player.isPlaying = true;
                player.currentSong = song;
            }
        },
        
        addToQueue(song: Song) {
            const player = this.player;
            if (player) {
                player.queue.push(song);
            }
        },

        nextSong() {
            const player = this.player;
            if (player && player.queue.length > 0) {
                if (player) {
                    player.isPlaying = true;
                    this.playSong(player.queue.shift()!);
                }
            }
        },        

        prevSong() {
            if (this.lastPlayed.length > 0) {
                const player = this.player;
                if (player && player.currentSong) {
                    player.queue.unshift(player.currentSong);
                }
                const previousSong = this.lastPlayed.shift();
                if (previousSong == null) return;
                if (player) {
                    player.currentSong = previousSong;
                }
            }
        },

        updateCurrentTime(time: number) {
            const player = this.player;
            if (player) {
                player.currentTime = time;
            }
        },

        updateVolume(volume: number) {
            const player = this.player;
            if (player) {
                player.volume = volume;
            }
        },
    },
    // persist: true
});