export class EmailError extends Error {
  constructor(message = "Failed to send email") {
    super(message);
  }
}
