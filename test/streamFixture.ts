import { TextDecoder, TextEncoder } from 'util';

(global as any).TextDecoder = TextDecoder;

export function streamFixture(initial: string[] = [], hold = false) {
  const encoder = new TextEncoder();
  const chunks = initial.map(value => encoder.encode(value));
  let closed = !hold;
  let pending: ((value: { done: boolean; value?: Uint8Array }) => void) | undefined;
  const reader = {
    read: jest.fn(() => {
      if (chunks.length) return Promise.resolve({ done: false, value: chunks.shift() });
      if (closed) return Promise.resolve({ done: true });
      return new Promise<{ done: boolean; value?: Uint8Array }>(resolve => { pending = resolve; });
    }),
    cancel: jest.fn(async () => { closed = true; chunks.length = 0; pending?.({ done: true }); pending = undefined; }),
    releaseLock: jest.fn()
  };
  return {
    reader,
    response: { ok: true, status: 200, headers: { get: () => 'text/event-stream' }, body: { getReader: () => reader } } as unknown as Response,
    push(text: string) {
      const value = encoder.encode(text);
      if (pending) { const resolve = pending; pending = undefined; resolve({ done: false, value }); }
      else chunks.push(value);
    },
    close() { closed = true; pending?.({ done: true }); pending = undefined; }
  };
}

export const tick = () => new Promise(resolve => setTimeout(resolve, 10));
