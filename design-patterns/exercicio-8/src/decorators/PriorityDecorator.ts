import { MessageDecorator } from './MessageDecorator';

export class PriorityDecorator extends MessageDecorator {
  getContent(): string {
    return `[PRIORIDADE] ${this.wrappedMessage.getContent()}`;
  }
}
