import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Producer } from "./producer.entity";
import { Harvest } from "./harvest.entity";

@Entity("farms")
export class Farm {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @ManyToOne(() => Producer, producer => producer.farms, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'producer_id', referencedColumnName: 'id' }])
  producer!: Producer;

  @Column()
  name!: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ length: 2, nullable: true })
  state?: string;

  @Column("decimal", { name: 'total_area' })
  totalArea!: number;

  @Column("decimal", { name: 'arable_area' })
  arableArea!: number;

  @Column("decimal", { name: 'vegetation_area' })
  vegetationArea!: number;

  @OneToMany(() => Harvest, harvest => harvest.farm)
  harvests!: Harvest[];

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
