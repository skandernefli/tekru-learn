import { DataType, Model,Column,Table,ForeignKey,HasMany } from 'sequelize-typescript';
import Task from './Task';

@Table({
  timestamps:true,
  tableName:"projects",
  modelName:"project"
})

class Project extends Model{
  //ID
   @Column({
    primaryKey:true,
    type:DataType.INTEGER.UNSIGNED,
    autoIncrement:true
 })
  declare id:number;
  //TITLE
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique:false

 })
  declare title:number;
  //START DATE
  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique:false
    

 })
  declare startDate:Date;
  //END DATE
  @Column({
    type: DataType.DATE,
    allowNull: true,
    unique:false,

 })
  declare endDate:Date;
  //DESCRIPTION
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique:false,
 })
  declare description:number;
  //TASK ID
  @ForeignKey(() => Task)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
    unique:false,
  })
  declare taskId: number; 
  @HasMany(()=>Task)
  declare tasks: Task;  

};
export default Project;
