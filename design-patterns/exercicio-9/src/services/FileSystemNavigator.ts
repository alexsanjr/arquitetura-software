import { Folder } from '../models/Folder';

export class FileSystemNavigator {
  private currentFolder: Folder;
  private folderStack: Folder[] = [];

  constructor(rootFolder: Folder) {
    this.currentFolder = rootFolder;
  }

  getCurrentFolder(): Folder {
    return this.currentFolder;
  }

  getCurrentPath(): string {
    if (this.folderStack.length === 0) {
      return '/' + this.currentFolder.getName();
    }
    
    const path = this.folderStack.map(f => f.getName()).join('/');
    return '/' + path + '/' + this.currentFolder.getName();
  }

  enterFolder(folderName: string): boolean {
    const child = this.currentFolder.getChild(folderName);
    
    if (!child) {
      console.log(`❌ Pasta "${folderName}" não encontrada.`);
      return false;
    }

    if (!child.isFolder()) {
      console.log(`❌ "${folderName}" não é uma pasta.`);
      return false;
    }

    this.folderStack.push(this.currentFolder);
    this.currentFolder = child as Folder;
    console.log(`✅ Entrou na pasta: ${folderName}`);
    return true;
  }

  goBack(): boolean {
    if (this.folderStack.length === 0) {
      console.log(`❌ Você já está na pasta raiz.`);
      return false;
    }

    this.currentFolder = this.folderStack.pop()!;
    console.log(`✅ Voltou para: ${this.currentFolder.getName()}`);
    return true;
  }

  listContents(): void {
    const children = this.currentFolder.getChildren();
    
    if (children.length === 0) {
      console.log('📂 Pasta vazia');
      return;
    }

    console.log(`\n📂 Conteúdo de "${this.currentFolder.getName()}":\n`);
    this.currentFolder.display();
    console.log();
  }
}
