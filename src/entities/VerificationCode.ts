import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class VerificationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  code: string;

  @Column('text')
  type: 'Register' | 'ResetPassword';
}

export default VerificationCode;
