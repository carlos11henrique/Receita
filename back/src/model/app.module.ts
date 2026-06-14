// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { GeneroModule } from './genero.module';
import { ReceitaModule } from './receita.module';
import { CriadorModule } from './Criador.module';
import { CompraModule } from './Compra.module';
import { PagamentoModule } from './Pagamento.module';
import { FormaPagamentoModule } from './FormaPagamento.module';
import { AvaliacaoModule } from './Avaliacao.module';
import { ComentarioModule } from './Comentario.module';
import { FavoritoModule } from './Favorito.module';
import { ProductModule } from './Product.module';
import { AffiliateLinkModule } from './AffiliateLink.module';
import { OrderModule } from './Order.module';
import { AffiliateCommissionModule } from './AffiliateCommission.module';
import { ProductRevenueRuleModule } from './ProductRevenueRule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'projeto_receita'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),

    UserModule,
    GeneroModule,
    ReceitaModule,
    CriadorModule,
    CompraModule,
    PagamentoModule,
    FormaPagamentoModule,
    AvaliacaoModule,
    ComentarioModule,
    FavoritoModule,
    ProductModule,
    AffiliateLinkModule,
    OrderModule,
    AffiliateCommissionModule,
    ProductRevenueRuleModule,
  ],
})
export class AppModule {}
