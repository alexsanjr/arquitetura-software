import { Resume } from "../models/Resume";

export class ResumeAdapter {
  constructor(private resume: Resume) { }

  toPlainText(): string {
    let output = `Nome: ${this.resume.name}\nContato: ${this.resume.contact}\n\nExperiência:\n`;
    this.resume.experiences.forEach((exp) => {
      output += `- ${exp.role} @ ${exp.company} (${exp.period})\n`;
    });
    output += `\nFormação:\n`;
    this.resume.education.forEach((edu) => {
      output += `- ${edu.course}, ${edu.institution} (${edu.period})\n`;
    });
    return output;
  }

  toJSON(): string {
    return JSON.stringify(this.resume, null, 2);
  }
}
