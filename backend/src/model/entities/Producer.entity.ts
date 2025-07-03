import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Farm } from "./Farm.entity";

@Entity("producers")
export class Producer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true})
  document!: string;

  @OneToMany(() => Farm, farm => farm.producer)
  farms!: Farm[];

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
