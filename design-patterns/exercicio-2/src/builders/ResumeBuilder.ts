import { Resume, Experience, Education } from "../models/Resume";

export class ResumeBuilder {
  private name: string = "";
  private contact: string = "";
  private experiences: Experience[] = [];
  private education: Education[] = [];

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withContact(contact: string): this {
    this.contact = contact;
    return this;
  }

  addExperience(role: string, company: string, period: string): this {
    this.experiences.push({ role, company, period });
    return this;
  }

  addEducation(course: string, institution: string, period: string): this {
    this.education.push({ course, institution, period });
    return this;
  }

  build(): Resume {
    return new Resume(this.name, this.contact, this.experiences, this.education);
  }
}
