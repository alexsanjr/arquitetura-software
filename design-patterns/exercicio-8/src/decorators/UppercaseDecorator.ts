import { MessageDecorator } from './MessageDecorator';

export class UppercaseDecorator extends MessageDecorator {
  getContent(): string {
    return this.wrappedMessage.getContent().toUpperCase();
  }
}
