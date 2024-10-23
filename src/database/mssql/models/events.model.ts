import { Column, Model, Table, DataType, HasMany, BelongsToMany, AllowNull } from 'sequelize-typescript';
import { TicketBooking } from './ticketBookings.model';
import { Wishlist } from './wishlist.model';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'events',
})
export class Event extends Model<Event> {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4,
    allowNull: false,
    primaryKey: true,
  })
  eventId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  eventName: string;

  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  category: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  eventDateTime: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duration: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalTickets: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  

  @Column({
    type:DataType.STRING,
    allowNull:false
  })
  organizerName: string;

  @Column({
    type:DataType.STRING,
    allowNull:false
  })
  organizerImage: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageUrl: string;

  
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  ticketPrice: number;


  
  @HasMany(() => TicketBooking,
  {
    onDelete:'CASCADE',
    hooks:true
  })
  bookings: TicketBooking[];

  @BelongsToMany(() => User, () => Wishlist) 
  usersWhoFavorited: User[]; 
}
