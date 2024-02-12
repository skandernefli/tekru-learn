"use client";
import { TextInput, Select, Button, Group, Box, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import getEmployees from "../queries/getEmployees";
import getProjects from "../queries/getProjects";
import createTask from "../mutations/createTask"
import { useQuery, useMutation } from "@apollo/client";

function Form() {
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

    const [CreateTask, { data, loading, error }] = useMutation(createTask);
    const handleSubmit = async (values:any) => {
      try {
        console.log("*****************************************",values)
        await CreateTask({ variables: values });
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

export default function CreateTask() {
  return (
    <div>
      <h1>./Create Task</h1>

      <Form />
    </div>
  );
}
