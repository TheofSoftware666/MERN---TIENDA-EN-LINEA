/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL_IMAGENES: string;
  // 👉 aquí puedes declarar más variables si las usas, por ejemplo:
  // readonly VITE_API_URL: string;
  // readonly VITE_APP_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
