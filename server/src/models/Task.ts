import { DataType, Model,Column,Table,BelongsTo,ForeignKey } from 'sequelize-typescript';
import Employee from "./Employee";
import Project from "./Project";
@Table({
  timestamps:true,
  tableName:"tasks",
  modelName:"task"
})
class Task extends Model{
  //ID
   @Column({
    primaryKey:true,
    type:DataType.INTEGER.UNSIGNED,
    autoIncrement:true
 })
  declare id:number;
  //TITLE
  @Column({
    type: DataType.STRING(70),
    allowNull: false,
    unique:false

 })
  declare title:number;
  //DESCRIPTION
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    unique:false

 })
  declare description:number;
  //EMPLOYEE ID
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    unique:false

  })
  declare employeeId: number; 
  @BelongsTo(()=>Employee)
  declare employee:Employee
  //PROJECT ID

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
    unique:false

  })
  declare projectId: number; 
  @BelongsTo(()=>Project)
  declare project:Project
};


export default Task;
