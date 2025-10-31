import { FileSystemComponent } from './FileSystemComponent';

export class File extends FileSystemComponent {
  constructor(name: string) {
    super(name);
  }

  display(indent: string = ''): void {
    console.log(`${indent}📄 ${this.name}`);
  }

  isFolder(): boolean {
    return false;
  }
}
