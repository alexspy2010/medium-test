import { Users } from "../../user/entity/user.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Posts')
export class Posts {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, unique: false, type: 'varchar' })
    title: string;

    @Column({ nullable: false, unique: false, type: 'text' })
    content: string;

    @Column({ nullable: false, unique: false, type: 'int' })
    @Index()
    user_id: number;

    @ManyToOne(() => Users, (user) => user.posts, {
        cascade: false,
        onDelete: "RESTRICT"
    })
    @JoinColumn({ name: "user_id" })
    user: Users

    @Column({ nullable: false, unique: false, default: 0 })
    rating: number;

    @Column({ nullable: false, unique: false, default: 0 })
    reading_time: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}