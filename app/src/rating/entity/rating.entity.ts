import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Ratings')
export class Ratings {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, unique: false, type: 'int' })
    @Index()
    user_id: number;
    
    @Column({ nullable: false, unique: false, type: 'int' })
    @Index()
    post_id: number;

    @Column({ nullable: false, unique: false, default: 0 })
    rating: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}