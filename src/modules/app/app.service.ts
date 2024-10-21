import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService){}

  getTenantId():string{
    return this.configService.get<string>('tenantId')
  }

  getClientId():string{
    return this.configService.get<string>('clientId')
  }

  getClientSecret():string{
    return this.configService.get<string>('clientSecret')
  }

  getRedirectUri():string{
    return this.configService.get<string>('redirectUrl')
  }

  getDbHost():string{
    return this.configService.get<string>('db_host')
  }
  getDbPort():string{
    return this.configService.get<string>('db_port')
  }

  getDb_domain():string{
    return this.configService.get<string>('db_domain')
  }

  getDb_username():string{
    return this.configService.get<string>('db_username')
  }

  getDb_password():string{
    return this.configService.get<string>('db_password')
  }

  getDb_name():string{
    return this.configService.get<string>('db_name')
  }

  getSmtp_host():string{
    return this.configService.get<string>('smtp_host')
  }

  getSmtp_port():string{
    return this.configService.get<string>('smtp_port')
  }
  
  getSmtp_user():string{
    return this.configService.get<string>('smtp_user')
  }

  getSmtp_pass():string{
    return this.configService.get<string>('smtp_pass')
  }


  getStripeSecret():string{
    return this.configService.get<string>('stripe_secret_key')
  }



}
