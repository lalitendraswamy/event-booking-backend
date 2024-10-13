import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Event } from './events.model';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'reviews',
})
export class Review extends Model<Review> {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4,
    allowNull: false,
    primaryKey: true,
  })
  reviewId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  review: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  userRating: number;

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
