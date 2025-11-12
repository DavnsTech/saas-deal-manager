import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  stage!: string; // e.g., "Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"

  @Column({ nullable: true })
  company!: string;

  @Column({ nullable: true })
  contactPerson!: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  value!: number;

  @Column({ nullable: true, type: 'date' })
  expectedCloseDate!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
