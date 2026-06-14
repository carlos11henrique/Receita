import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './model/app.module';
import helmet from 'helmet';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

async function ensureDatabaseExists() {
  const host = process.env.DB_HOST ?? 'localhost';
  const port = Number(process.env.DB_PORT ?? 5432);
  const user = process.env.DB_USERNAME ?? 'postgres';
  const password = process.env.DB_PASSWORD ?? 'postgres';
  const database = process.env.DB_DATABASE ?? 'projeto_receita';
  const defaultDatabase = process.env.DB_DEFAULT_DATABASE ?? 'postgres';

  const client = new Client({
    host,
    port,
    user,
    password,
    database: defaultDatabase,
  });

  await client.connect();

  const result = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [database]);
  if (result.rowCount === 0) {
    const safeName = database.replace(/"/g, '""');
    await client.query(`CREATE DATABASE "${safeName}"`);
  }

  await client.end();
}

async function bootstrap() {
  await ensureDatabaseExists();

  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.json(),
        ),
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.json(),
        ),
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.json(),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger: {
      log: (message, context) => logger.info(message, { context }),
      error: (message, trace, context) => logger.error(message, { trace, context }),
      warn: (message, context) => logger.warn(message, { context }),
      debug: (message, context) => logger.debug(message, { context }),
      verbose: (message, context) => logger.verbose(message, { context }),
    },
  });

  // Segurança
  app.use(helmet());

  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : [
        'http://localhost:3000',
        'http://localhost:3007',
        'http://localhost:5176',
        'http://localhost:5173',
        'http://localhost:5178',
        'http://localhost:5179',
        'http://localhost:5180',
      ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

const port = Number(process.env.PORT ?? 3007);
await app.listen(port);}
bootstrap();
