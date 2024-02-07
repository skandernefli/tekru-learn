import { DataType, Model, Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Task from './Task';


@Table({
  timestamps:true,
  tableName:"employees",
  modelName:"employee"
})

class Employee extends Model{
  //ID
   @Column({
    primaryKey:true,
    type:DataType.INTEGER.UNSIGNED,
    autoIncrement:true
 })
  declare id:number;
  //NAME
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
 })
  declare name:number;
  //PHONE NUMBER
  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    unique:false

 })
  declare phoneNumber:number;
  //EMAIL
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique:true
 })
  declare email:number
  //TASK ID
  @ForeignKey(() => Task)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
    unique:false

  })
  declare taskId: number; 
  @BelongsTo(()=>Task)
  declare task: Task;  

};

export default Employee;
