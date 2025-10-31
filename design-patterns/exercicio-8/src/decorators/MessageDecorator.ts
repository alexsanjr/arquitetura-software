import { Message } from '../models/Message';

export abstract class MessageDecorator implements Message {
  constructor(protected wrappedMessage: Message) {}

  abstract getContent(): string;
}
