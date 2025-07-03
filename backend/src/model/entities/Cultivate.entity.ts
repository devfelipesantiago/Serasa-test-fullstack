import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Harvest } from "./Harvest.entity";

@Entity("cultivates")
export class Cultivate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Harvest, harvest => harvest.cultivates, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'harvest_id', referencedColumnName: 'id' },
  ])
  harvest!: Harvest;

  @Column()
  harvest_id!: number;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
