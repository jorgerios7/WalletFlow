export interface StorageKeys {
  THEME: string;
  FONT_SIZE: string;
  INIT_SCREEN: string;
  SCREEN_ACTIVATION_TIME: string;
  PROFILE_PHOTO_KEY: string;
  USER_EMAIL_REMINDER: string;
}

export const STORAGE_KEYS = (userId: string): StorageKeys => ({
  THEME: `app_user:${userId}_theme_settings`,
  FONT_SIZE: `app_user:${userId}_font_size_mode`,
  INIT_SCREEN: `app_user:${userId}_init_screen`,
  SCREEN_ACTIVATION_TIME: `app_user:${userId}_screen_activation_time`,
  PROFILE_PHOTO_KEY: `app_user:${userId}_user_profile_photo`,
  USER_EMAIL_REMINDER: `app_user_email_reminder`,
});
