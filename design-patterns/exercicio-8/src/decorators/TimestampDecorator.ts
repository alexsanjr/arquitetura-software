import { MessageDecorator } from './MessageDecorator';

export class TimestampDecorator extends MessageDecorator {
  getContent(): string {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return `[${timestamp}] ${this.wrappedMessage.getContent()}`;
  }
}
