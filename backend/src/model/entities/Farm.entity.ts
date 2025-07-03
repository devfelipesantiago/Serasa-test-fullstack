import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Producer } from "./Producer.entity";
import { Harvest } from "./Harvest.entity";

@Entity("farms")
export class Farm {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Producer, producer => producer.farms, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'producer_id', referencedColumnName: 'id' }])
  producer!: Producer;

  @Column()
  producer_id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ length: 2, nullable: true })
  state?: string;

  @Column("decimal")
  total_area!: number;

  @Column("decimal")
  arable_area!: number;

  @Column("decimal")
  vegetation_area!: number;

  @OneToMany(() => Harvest, harvest => harvest.farm)
  harvests!: Harvest[];

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
