import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserCheckService {
  constructor() {}

  /**
   * Checks if local storage is available in the current environment.
   *
   * @return {boolean} True if local storage is available, false otherwise.
   */
  isLocalStorageAvailable(): boolean {
    if (!this.isBrowser()) return false;

    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Checks if the current environment is a browser.
   *
   * @return {boolean} True if the environment is a browser, false otherwise.
   */
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
}
