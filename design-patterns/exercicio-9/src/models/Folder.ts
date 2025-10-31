import { FileSystemComponent } from './FileSystemComponent';

export class Folder extends FileSystemComponent {
  private children: FileSystemComponent[] = [];

  constructor(name: string) {
    super(name);
  }

  add(component: FileSystemComponent): void {
    this.children.push(component);
  }

  remove(component: FileSystemComponent): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getChild(name: string): FileSystemComponent | undefined {
    return this.children.find(child => child.getName() === name);
  }

  getChildren(): FileSystemComponent[] {
    return this.children;
  }

  display(indent: string = ''): void {
    console.log(`${indent}📁 ${this.name}/`);
    for (const child of this.children) {
      child.display(indent + '  ');
    }
  }

  isFolder(): boolean {
    return true;
  }
}
