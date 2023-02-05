import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  groupId: string;

  @Column({ length: 50 })
  title: string;

  @Column()
  amount: number;

  @Column('tinyint')
  type: number;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
