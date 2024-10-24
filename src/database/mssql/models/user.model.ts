import { Column, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Review } from './reviews.model';
import { TicketBooking } from './ticketBookings.model';
import { Event } from './events.model';
import { Wishlist } from './wishlist.model';
import { v4 as uuidv4 } from 'uuid';
import { Role } from 'src/core/enums/roles.enum';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4, 
    allowNull: false,
    primaryKey: true,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type:DataType.STRING,
    allowNull:true
  })
  userImageUrl:string;

  @Column({
    type: DataType.STRING,
    allowNull: false, 
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    allowNull: false,
    // enum: Role,
    defaultValue: Role.user
  })
  role: Role;

  @HasMany(() => Review,{
    onDelete:'CASCADE',
    hooks:true
  })
  reviews: Review[];

  @HasMany(() => TicketBooking,
  {
    onDelete:'CASCADE',
    hooks:true
  })
  bookings: TicketBooking[];

  @BelongsToMany(() => Event, () => Wishlist) // Establish many-to-many relation
  favoriteEvents: Event[]; // Alias for the wishlist events
}

