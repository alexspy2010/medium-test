import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Readings')
export class Readings {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({ nullable: false, unique: false, type: 'int' })
    @Index()
    post_id: number;

    @Column({ nullable: false, unique: false, default: 0 })
    reading: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}