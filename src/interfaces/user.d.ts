import { Song } from "./song";
import { UserPlaylist } from "./userPlaylist";

export interface User {
    id: number;
    username: string;
    email: string;
    pic_url: string;
    playlists: UserPlaylist[];
    songs_uploaded: Song[];
}