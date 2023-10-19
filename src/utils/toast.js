import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function showErrorToast (message, duration) {
    toast(message, {
    position: "bottom-right",
    theme: "dark",
    autoClose: duration || 3000,
    closeOnClick: true,
    closeButton: true,
    type: 'error',
    isLoading: false,
    });
};

export function showSuccessToast (message, duration) {
    toast(message, {
    position: "bottom-right",
    theme: "dark",
    autoClose: duration || 3000,
    closeOnClick: true,
    closeButton: true,
    type: 'success',
    isLoading: false,
    });
};