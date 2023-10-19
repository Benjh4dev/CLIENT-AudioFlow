import api from '@/services/api';
import { useMainStore } from '@/stores/main';

interface ChangePasswordData {
    currentPassword: string;
    password: string;
    confirmPassword: string;
}

interface ChangeEmail {
    email: string;
}

interface ChangePhoto {
    file: File | null
};

export async function changePassword(data: ChangePasswordData) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.patch(`/user/${mainStore.$state.user?.id}/changePassword`, data, {
        headers: {
          'Authorization': `Bearer ${mainStore.$state.token}`
        }
      });
    return response.data;
};

export async function changeEmail(data: ChangeEmail) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();
    
    const response = await api.patch(`/user/${mainStore.$state.user?.id}/changeEmail`, data, {
        headers: {
          'Authorization': `Bearer ${mainStore.$state.token}`
        }
      });
    return response.data;
};

export async function changePhoto(data: ChangePhoto) {
    const mainStore = useMainStore();
    mainStore.verifyTokenValidity();

    const response = await api.patch(`/user/${mainStore.$state.user?.id}/upload`, data, {
        headers: {
            'Content-type': 'multipart/form-data',
            'Authorization': `Bearer ${mainStore.$state.token}`
        }
    });
    console.log(response.data)
    return response.data;
};