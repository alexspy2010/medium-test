import { Exclude } from "class-transformer";
import { Posts } from "../../post/entity/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, unique: true })
    mail: string;

    @Column({ nullable: false })
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ nullable: false, unique: false, default: 0 })
    rating: number;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Posts, (post) => post.user)
    posts: Posts[]
}