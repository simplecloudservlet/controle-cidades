
export class WebStorage {
  static get(key: string): any {
    return JSON.parse(localStorage.getItem(key)!);
  }
  static set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
