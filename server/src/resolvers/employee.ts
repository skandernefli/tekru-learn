import Employee from "../models/Employee";

const EmployeeResolver = {
  Query: {
    getEmployee: async (_: any, { id }: { id: any }) => {
      return await Employee.findByPk(id);
    },
    getEmployees: async () => {
      return await Employee.findAll();
    },
  },
  Mutation: {
    createEmployee: async (
      _: any,
      {
        name,
        phoneNumber,
        email,
        taskId,
      }: { name: string; phoneNumber: string; email: string; taskId: string }
    ) => {
      return await Employee.create({ name, phoneNumber, email, taskId });
    },
    updateEmployee: async (
      _: any,
      {
        id,
        name,
        phoneNumber,
        email,
        taskId,
      }: {
        id: any;
        name: string;
        phoneNumber: string;
        email: string;
        taskId: string;
      }
    ) => {
      const theEmployee = await Employee.findByPk(id);
      if (theEmployee) {
        await theEmployee.update({ name, phoneNumber, email, taskId });
        return theEmployee;
      }
      return null;
    },
    deleteEmployee: async (
      _: any,
      {
        id,
     
      }: {
        id: any;
       
      }
    )  => {
      const theEmployee = await Employee.findByPk(id);
      if (theEmployee) {
        await theEmployee.destroy();
        return true;
      }
      return false;
    },
  },
};
export default EmployeeResolver;
