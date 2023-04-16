import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('ReadingLogs')
export class ReadingLogs {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, unique: false, type: 'int' })
    @Index()
    user_id: number;
    
    @Column({ nullable: false, unique: false, type: 'int' })
    @Index()
    post_id: number;

    @Column({ nullable: false, unique: false, default: "" })
    @Index()
    uuid: string;

    @Column({ nullable: false, unique: false, default: false })
    end_reading:boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}