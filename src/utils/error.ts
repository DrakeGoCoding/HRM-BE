interface AppErrorPayload {
  code?: number;
  message: string;
}

class AppError extends Error implements AppErrorPayload {
  code: number;

  constructor({ code = 500, message }: AppErrorPayload) {
    super(message);
    this.code = code;
  }
}

export default AppError;
