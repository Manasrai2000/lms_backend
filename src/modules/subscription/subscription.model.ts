import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.model";

export enum SubscriptionType {
  LIFETIME = "lifetime",
}

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.subscription, { onDelete: "CASCADE" })
  @JoinColumn()
  user!: User;

  @Column({ default: false })
  isSubscribed!: boolean;

  @Column({
    type: "enum",
    enum: SubscriptionType,
    nullable: true,
  })
  subscriptionType!: SubscriptionType;

  @Column({ nullable: true })
  subscribedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
