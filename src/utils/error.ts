interface AppErrorPayload {
  code?: number;
  data?: any;
  message: string;
}

class AppError extends Error implements AppErrorPayload {
  code: number;
  data: any;

  constructor({ code = 500, data = null, message }: AppErrorPayload) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export default AppError;
