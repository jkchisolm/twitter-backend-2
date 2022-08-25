import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  token: string; // refresh token stored as a hash

  @Column({ type: 'timestamp with time zone' })
  expires_at: Date; // date holding the expiration date of the refresh token

  @Column('text')
  user_id: string; // user id of the user who owns the refresh token
}

export default RefreshToken;
