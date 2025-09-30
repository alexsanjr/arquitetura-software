export class AppConfig {
  private static instance: AppConfig;
  public outputDir: string = "./output";

  private constructor() { }

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}
