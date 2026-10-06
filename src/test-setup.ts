import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

declare global {
  var process: {
    env: Record<string, string | undefined>;
    browser?: boolean;
  };
}

if (typeof globalThis.process === 'undefined') {
  Object.defineProperty(globalThis, 'process', {
    value: {
      env: {},
      browser: true,
    },
    configurable: true,
    writable: true,
  });
}

if (typeof (globalThis as any).global === 'undefined') {
  Object.defineProperty(globalThis, 'global', {
    value: globalThis,
    configurable: true,
    writable: true,
  });
}

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

export {};
