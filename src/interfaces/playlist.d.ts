import { Song } from './song';

export interface Playlist {
    id: string;
    user_id: string;
    name: string;
    songs: Song[];
};