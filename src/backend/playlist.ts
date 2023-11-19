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
