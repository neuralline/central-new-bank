import {classToPlain} from 'class-transformer'
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export default abstract class MainEntity extends BaseEntity {
  /*  @PrimaryGeneratedColumn('uuid')
  uuid: string */

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toJSON() {
    return classToPlain(this)
  }
}
