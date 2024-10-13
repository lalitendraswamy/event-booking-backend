import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Event } from './events.model';

@Table({
  tableName: 'wishlists',
  timestamps: false, // You may skip timestamps here if unnecessary
})
export class Wishlist extends Model<Wishlist> {
  @ForeignKey(() => User)
  @Column
  userId: string; // References the user who added the event to their wishlist

  @ForeignKey(() => Event)
  @Column
  eventId: string; // References the event added to the wishlist
}
