// Interface base para componentes do sistema de arquivos
export abstract class FileSystemComponent {
  constructor(protected name: string) {}

  getName(): string {
    return this.name;
  }

  add(component: FileSystemComponent): void {
    throw new Error('Operação não suportada');
  }

  remove(component: FileSystemComponent): void {
    throw new Error('Operação não suportada');
  }

  getChild(name: string): FileSystemComponent | undefined {
    throw new Error('Operação não suportada');
  }

  getChildren(): FileSystemComponent[] {
    throw new Error('Operação não suportada');
  }

  abstract display(indent?: string): void;

  abstract isFolder(): boolean;
}
