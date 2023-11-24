import api from '@/services/api';
import { useMainStore } from '@/stores/main';
import { CreatePlaylistForm } from '@/interfaces';

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

export async function deletePlaylist(playlistId: string) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.delete(`/playlist/${playlistId}`,{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    return response;
}

export async function getUserPlaylists() {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.get(`/playlist/${mainStore.$state.user?.id}`,{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    // Si no hay playlists, retorna un arreglo vacío, cambiamos esto carlo jiji
    if (response.data.length === 0) {
        return [];
    }   
    const userPlaylists = response.data.sort((a: any, b: any) => {
        return a.timestamp._seconds - b.timestamp._seconds;
    });

    return userPlaylists;
}

export async function addSongToPlaylist(playlistId: string, songId: string) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.post(`/playlist/${playlistId}/song/${songId}`, {},{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    return response.data;
}

export async function removeSongFromPlaylist(playlistId: number, songId: number) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.delete(`/playlist/${playlistId}/song/${songId}`,{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    return response.data;
}
