import Project from "../models/Project";

const ProjectResolver = {
  Query: {
    getProject: async (_: any, { id }: { id: any }) => {
      return await Project.findByPk(id);
    },
    getProjects: async () => {
      return await Project.findAll();
    },
  },
  Mutation: {
    createProject: async (
      _: any,
      {
        title,
        startDate,
        endDate,
        description,
        taskId,
      }: {
        title: string;
        startDate: string;
        endDate: string;
        description: string;
        taskId: string;
      }
    ) => {
      return await Project.create({
        title,
        startDate,
        endDate,
        description,
        taskId,
      });
    },
    updateProject: async (
      _: any,
      {
        id,
        title,
        startDate,
        endDate,
        description,
        taskId,
      }: {
        id: any;
        title: string;
        startDate: string;
        endDate: string;
        description: string;
        taskId: string;
      }
    ) => {
      const theProject = await Project.findByPk(id);
      if (theProject) {
        await theProject.update({
          title,
          startDate,
          endDate,
          description,
          taskId,
        });
        return theProject;
      }
      return null;
      
    },
    deleteProject: async (
      _: any,
      {
        id,
      }: {
        id: any;
      }
    ) => {
      const theProject = await Project.findByPk(id);
      if (theProject) {
        await theProject.destroy();
        return true;
      }
      return false;
    },
  },
};
export default ProjectResolver;
