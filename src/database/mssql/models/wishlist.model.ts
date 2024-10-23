import { Column, Model, Table, ForeignKey, BelongsTo, DataType, PrimaryKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Event } from './events.model';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'wishlists',
  timestamps: false, 
})
export class Wishlist extends Model<Wishlist> {

    @Column({
      type:DataType.UUID,
      defaultValue: uuidv4,
      allowNull:false,
      primaryKey:true
    })
    wishListId:string;
    

  @ForeignKey(() => User)
  @Column
  userId: string; 

  
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Event)
  @Column
  eventId: string; 

  @BelongsTo(() => Event)
  event: Event;
}
