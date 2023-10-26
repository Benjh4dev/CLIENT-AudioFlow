import api from '@/services/api';
import { useMainStore } from '@/stores/main';
import { UploadSongForm } from '@/interfaces';

export async function uploadSong(data: UploadSongForm) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.post(`/song/${mainStore.$state.user?.id}`, data, {
        headers: {
            'Authorization': `Bearer ${mainStore.$state.token}`,
            'Content-type': 'multipart/form-data',
        }
    });
    return response.data;
};

export async function fetchSongs() {
    const response = await api.get("/song");
    return response.data;
};

export async function fetchUserSongs() {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();
    
    const response = await api.get(`/song/${mainStore.$state.user?.id}`);
    return response.data;
};