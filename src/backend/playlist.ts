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
};

export async function deletePlaylist(playlistId: string) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.delete(`/playlist/${playlistId}`,{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    console.log(response.data)
    return response;
};

export async function fetchPlaylists() {
    const response = await api.get('/playlist');
    return response.data;
};

export async function fetchUserPlaylists() {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.get(`/playlist/user/${mainStore.$state.user?.id}`,{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    if (response.data.length === 0) {
        return [];
    }   
    const userPlaylists = response.data.sort((a: any, b: any) => {
        return a.timestamp._seconds - b.timestamp._seconds;
    });

    return userPlaylists;
};

export async function fetchPlaylistById(playlistId: string) {
    const response = await api.get(`/playlist/${playlistId}`)
    return response.data;
};

export async function addSongToPlaylist(playlistId: string, songId: string) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.post(`/playlist/${playlistId}/${songId}`, {},{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    return response.data;
};

export async function removeSongFromPlaylist(playlistId: String, songId: String) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();
    // console.log(playlistId, songId)
    const response = await api.delete(`/playlist/${playlistId}/${songId}`,{
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
        }
    });
    console.log(response)
    return response.data;
};