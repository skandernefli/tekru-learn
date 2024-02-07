import { Sequelize  } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import Employee from '../models/Employee';
import Task from '../models/Task';
import Project from '../models/Project';
dotenv.config();


const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port:Number(process.env.PORT),
  username: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models:[Task,Project,Employee],
  logging: false, 
});
async function connection(){
    try {
        await sequelize.authenticate();
        console.log('\n🚀      Connection to Mysql Database was succesful');
      //   await sequelize.sync({force:true});
        console.log('\n🔄      Models synchronized with the database');
        
      } catch (error) {
        console.error('\n❌    Unable to connect to the database:', error);
      }
}

export   { sequelize,connection };
