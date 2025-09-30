# 📌 Desafio Design Pattern 2 - Gerador de Currículos

---

## 📝 Enunciado

Você foi contratado para desenvolver um aplicativo de console que ajude usuários a montar **currículos personalizados**.

O usuário deve poder informar:

- Nome
- Contato
- Experiência profissional (múltiplas entradas)
- Formação acadêmica (múltiplas entradas)

### Requisitos:

- O sistema deve permitir ao usuário digitar os dados em **etapas**.
- O currículo deve ser montado passo a passo utilizando o padrão **Builder**, com métodos como:

```ts
resumeBuilder
  .withName("Diego")
  .withContact("diego.castro@cefet-rj.br")
  .addExperience("Professor", "CEFET", "2015-2024")
  .addEducation("Doutorado em Computação", "UFRJ", "2019-2023")
  .build();
```
