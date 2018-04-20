/**
 * Config Models
 */

interface DbConfig {
  host: string
  port: number
  database: string
  user: string
  password: string
}

interface ApiConfig {
  host: string
  jwtSecret: string
  baseUrl: string
  port: number
}

export interface EnvConfig {
  db: DbConfig
  api: ApiConfig
}

export type EnvKeys = 'dev' | 'prod'
export type Config = Record<EnvKeys, EnvConfig>