import * as fs from "fs";
import * as readline from "readline";
import { ResumeBuilder } from "./builders/ResumeBuilder";
import { ExporterFactory } from "./factory/ExporterFactory";
import { AppConfig } from "./core/AppConfig";

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (q: string) =>
    new Promise<string>((res) => rl.question(q, (ans) => res(ans)));

  while (true) {
    const cmd = await ask("Digite 'novo' para criar currículo ou 'sair': ");
    if (cmd.toLowerCase() === "sair") break;

    if (cmd.toLowerCase() === "novo") {
      const builder = new ResumeBuilder();

      const name = await ask("Nome: ");
      builder.withName(name);

      const contact = await ask("Contato: ");
      builder.withContact(contact);

      let addMore: string;
      do {
        const role = await ask("Cargo: ");
        const company = await ask("Empresa: ");
        const period = await ask("Período: ");
        builder.addExperience(role, company, period);
        addMore = await ask("Adicionar mais experiência? (s/n): ");
      } while (addMore.toLowerCase() === "s");

      do {
        const course = await ask("Curso: ");
        const institution = await ask("Instituição: ");
        const period = await ask("Período: ");
        builder.addEducation(course, institution, period);
        addMore = await ask("Adicionar mais formação? (s/n): ");
      } while (addMore.toLowerCase() === "s");

      const resume = builder.build();

      // pegar diretório do singleton
      const config = AppConfig.getInstance();
      if (!fs.existsSync(config.outputDir)) fs.mkdirSync(config.outputDir);

      const filename = `${config.outputDir}/resume_${Date.now()}`;

      const txtExporter = ExporterFactory.createExporter("txt");
      txtExporter.export(resume, filename);

      const jsonExporter = ExporterFactory.createExporter("json");
      jsonExporter.export(resume, filename);
    }
  }

  rl.close();
}

main();
