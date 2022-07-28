export interface IApiConfig {
  port: number;
}

export interface IConfig {
  api: IApiConfig;
}

export interface IDatabaseConfig {
  type: "postgres";
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
}
