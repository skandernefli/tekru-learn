"use client";
import { TextInput, Select, Button, Group, Box, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import getEmployees from "../../queries/getEmployees";
import createTask from "../../mutations/createTask"
import { useQuery, useMutation } from "@apollo/client";

function Form({id}:{id:any}) {
  const [value, setValue] = useState<Date | null>(null);
  const {
    loading: LoadingEmployees,
    error: EmployeeErno,
    data: queryEmployees,
  } = useQuery(getEmployees);
  

    const [CreateTask, { data, loading, error }] = useMutation(createTask);
    const handleSubmit = async (values:any) => {
      try {
        await CreateTask({ variables:  { projectId:id, ...values} });
      } catch (error) {
        console.error("err", error);
      }
    };
  

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      employeeId: "",
    },

    validate: {
      title: (value) => (/^[a-zA-Z\s]+$/.test(value) ? null : "Invalid name"),
      description: (value) =>
        value.length >= 10
          ? null
          : "Description must be at least 10 characters",
      employeeId: (value) => (value ? null : "Please select an employee"),
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

       

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default function CreateTaskForProject({params}) {
  return (
    <div>
      <h1>./Create Task for project {params.id}</h1>

      <Form  id={params.id}  />
    </div>
  );
}
