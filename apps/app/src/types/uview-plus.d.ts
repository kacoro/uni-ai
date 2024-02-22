declare module 'uview-plus' {
  export function install(): void; //必须加上这句，才能
  interface $u {
    setConfig: setConfig;
  }

  global {
    interface Uni {
      $u: $u;
    }
  }
}
