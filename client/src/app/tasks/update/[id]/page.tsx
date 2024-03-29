"use client";
import { TextInput, Select, Button, Group, Box, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import getEmployees from "../../../queries/getEmployees";
import getProjects from "../../../queries/getProjects";
import { useQuery, useMutation } from "@apollo/client";
import updateTask from '../../../mutations/updateTask';

function Form({id}:{id:any}) {
  const [value, setValue] = useState<Date | null>(null);
  const {
    loading: LoadingEmployees,
    error: EmployeeErno,
    data: queryEmployees,
  } = useQuery(getEmployees);
  const {
    loading: LoadingProjects,
    error: ProjectsErno,
    data: queryProjects,
  } = useQuery(getProjects);

  const [UpdateTask, { data, loading, error }] = useMutation(updateTask);
  const handleSubmit = async (values:any) => {
    try {
      await UpdateTask({ variables:  { updateTaskId:id, ...values} });
    } catch (error) {
      console.error("err", error);
    }
  };
  

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      employeeId: "",
      projectId: "",
    },

    validate: {
      title: (value) => (/^[a-zA-Z\s]+$/.test(value) ? null : "Invalid name"),
      description: (value) =>
        value.length >= 10
          ? null
          : "Description must be at least 10 characters",
      employeeId: (value) => (value ? null : "Please select an employee"),
      projectId: (value) => (value ? null : "Please select a project"),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="title"
          placeholder="title"
          {...form.getInputProps("title")}
          error={form.errors.title}

        />
        <Textarea
          size="md"
          label="Project Description"
          placeholder="Write your project Description"
          {...form.getInputProps("description")}
          error={form.errors.description}

        />

        <Select
          label="Select Employee"
          placeholder="Pick an employee"
          /*           loading={LoadingEmployees}
           */ data={queryEmployees?.getEmployees.map((employee: any) => ({
            label: employee.name,
            value: employee.id,
          }))}
          {...form.getInputProps("employeeId")}
        />

        <Select
          label="Select Project"
          placeholder="Pick a project"
          /*            loading={loadingProjects}
           */ data={queryProjects?.getProjects.map((project: any) => ({
            label: project.title,
            value: project.id,
          }))}
          {...form.getInputProps("projectId")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default function CreateTask({params}) {
  return (
    <div>
      <h1>./Update Task {params.id}</h1>

      <Form id={params.id} />
    </div>
  );
}
