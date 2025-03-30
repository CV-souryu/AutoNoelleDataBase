interface ImportMetaEnv {
    readonly PUBLIC_MS_TID: string;
    readonly PUBLIC_STATIC_ASSETS: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }