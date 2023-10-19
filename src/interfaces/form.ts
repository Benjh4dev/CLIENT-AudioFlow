export interface FormErrors {
    [key: string]: string;
  };

export interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export interface LoginForm {
  email: string;
  password: string;
};

export interface ChangeEmailForm {
  email: string; 
};

export interface ChangePasswordForm {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export interface ChangePhotoForm {
  file: File | null
};