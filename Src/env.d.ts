/// <reference types="vite/client" />

interface ImportMetaEnv {
    /**
     * 项目名称
     */
    readonly VITE_APP_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
