export interface Experience {
  role: string;
  company: string;
  period: string;
}

export interface Education {
  course: string;
  institution: string;
  period: string;
}

export class Resume {
  constructor(
    public name: string,
    public contact: string,
    public experiences: Experience[],
    public education: Education[]
  ) { }
}
