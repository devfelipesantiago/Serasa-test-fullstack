import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Farm } from "./farm.entity";
import { Cultivate } from "./cultivate.entity";

@Entity("harvests")
export class Harvest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  year!: number;

  @ManyToOne(() => Farm, farm => farm.harvests, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'farm_id', referencedColumnName: 'id' }])
  farm!: Farm;

  @OneToMany(() => Cultivate, cultivate => cultivate.harvest)
  cultivates!: Cultivate[];

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
