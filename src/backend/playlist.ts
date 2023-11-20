import api from '@/services/api';
import { useMainStore } from '@/stores/main';
import { CreatePlaylistForm } from '@/interfaces';

//crear playlist
export async function createPlaylist(data: CreatePlaylistForm) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.post(`/playlist/${mainStore.$state.user?.id}`, data,{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    return response.data;
}
//eliminar playlist
export async function deletePlaylist(playlistId: number) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.delete(`/playlist/${playlistId}`,{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    return response.data;
}

//agregar canción a playlist
export async function addSongToPlaylist(playlistId: number, songId: number) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.post(`/playlist/${playlistId}/song/${songId}`, {},{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    return response.data;
}



