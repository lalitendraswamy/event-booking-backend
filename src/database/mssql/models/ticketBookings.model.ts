import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Event } from './events.model';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'ticket_bookings',
})
export class TicketBooking extends Model<TicketBooking> {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4,
    allowNull: false,
    primaryKey: true,
  })
  bookingId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  numberOfTickets: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  ticketPrice: number;

  @Column({
    type: DataType.ENUM('booked', 'failed'),
    allowNull: false,
  })
  status: 'booked' | 'failed';

  @ForeignKey(() => Event)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  eventId: string;

  @BelongsTo(() => Event)
  event: Event;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
