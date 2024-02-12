import Task from "../models/Task";
import Employee from "../models/Employee"
const TaskResolver = {
  Query: {
    getTask: async (_: any, { id }: { id: any }) => {
      return await Task.findByPk(id);
    },
    getTasks: async () => {
      return await Task.findAll();
    },
  },
  Mutation: {
    createTask: async (
      _: any,
      {
        title,
        description,
        projectId,
        employeeId,
      }: { title: string; description: string; projectId: string; employeeId: string }
    ) => {
      console.log( title,
        description,
        projectId,
        employeeId,);
      return await Task.create(    {
        title,
        description,
        projectId,
        employeeId,
      });
    },
    updateTask: async (
      _: any,
      { id,
        title,
        description,
        projectId,
        employeeId,
      }: {id:any; title: string; description: string; projectId: string; employeeId: string }
    ) => {
      const theTask = await Task.findByPk(id);
      if (theTask) {
        await theTask.update( { 
            title,
            description,
            projectId,
            employeeId,
          });
        return theTask;
      }
      return null;
    },
    deleteTask: async (
      _: any,
      {
        id,
     
      }: {
        id: any;
       
      }
    )  => {
      const theTask = await Task.findByPk(id);
      if (theTask) {
        await theTask.destroy();
        return true;
      }
      return false;
    },
   },
   task: {
    employee: async (task: any) => {
      return await Employee.findByPk(task.employeeId)
    },
  }
};
export default TaskResolver;
