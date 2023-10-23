import api from '@/services/api';
import { useMainStore } from '@/stores/main';
import { UploadSongForm } from '@/interfaces';

export async function uploadSong(data: UploadSongForm) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.post(`/song`, data, {
        headers: {
            'Content-type': 'multipart/form-data',
        }
    });
    return response.data;
};