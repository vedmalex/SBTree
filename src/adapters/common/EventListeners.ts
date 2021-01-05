export type EventListeners = {
  event: string | symbol
  listener: (...args: any[]) => void
  type: 'on' | 'once'
}
