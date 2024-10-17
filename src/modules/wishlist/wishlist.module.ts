import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports:[
    DatabaseModule,
  ],
  providers: [WishlistService],
  controllers: [WishlistController],
  exports:[WishlistService]
})
export class WishlistModule {}
