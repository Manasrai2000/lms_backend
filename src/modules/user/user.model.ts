import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Subscription } from "../subscription/subscription.model";
import { DeviceSession } from "../device/device.model";

export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ nullable: true })
  profileImage!: string;

  @Column({ nullable: true })
  companyName!: string;

  @Column()
  phoneNumber!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role!: UserRole;
  
  @Column({
    type: "enum",
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  provider!: AuthProvider;

  @Column({ nullable: true, unique: true })
  providerId!: string;

  @Column({ nullable: true })
  resetOtp!: string;

  @Column({ nullable: true })
  otpExpiry!: Date;

  @Column({ nullable: true })
  currentHashedRefreshToken!: string;

  @Column({ nullable: true })
  trialStartDate!: Date;

  @Column({ nullable: true })
  trialEndDate!: Date;

  @OneToOne(() => Subscription, (subscription: Subscription) => subscription.user)
  subscription!: Subscription;

  @OneToMany(() => DeviceSession, (session: DeviceSession) => session.user)
  deviceSessions!: DeviceSession[];

  @Column({ nullable: true })
  lastLoginAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}