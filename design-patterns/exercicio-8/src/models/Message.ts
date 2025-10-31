export interface Message {
  getContent(): string;
}

export class SimpleMessage implements Message {
  constructor(private content: string) {}

  getContent(): string {
    return this.content;
  }
}
