export class IntegrationError extends Error {
  constructor(
    message: string,
    private readonly integrationKey: string,
    private readonly methodName: string,
    private readonly error?: any
  ) {
    super(message);
    this.name = "IntegrationError";
  }

  toString(): string {
    return `${this.name}: ${this.message}\nIntegration: ${
      this.integrationKey
    }\nMethod: ${this.methodName}\nOriginal Error: ${this.error?.toString()}`;
  }
}
