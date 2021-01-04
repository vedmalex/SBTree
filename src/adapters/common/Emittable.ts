import { EventEmitter } from 'events';
import { EventListeners } from './EventListeners';

export class Emittable {
  private emitter: EventEmitter = new EventEmitter()
  private listeners: Array<EventListeners> = [];

  on(event: string | symbol, listener: (...args: any[]) => void){
    this.emitter.on(event, listener)
    this.listeners.push({
      event,
      listener,
      type: 'on'
    })
  }
  once(event: string | symbol, listener: (...args: any[]) => void){
    this.emitter.once(event, listener)
    this.listeners.push({
      event,
      listener,
      type: 'once'
    })
  }

  close(){
    this.emit('close');
    setTimeout(()=>{
      this.emitter.removeAllListeners()
    },10)
  }

  emit(event: string | symbol, ...args: any[]){
    return this.emitter.emit(event, ...args)
  }


}