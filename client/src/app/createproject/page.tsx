"use client";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { Textarea } from "@mantine/core";
import {useMutation } from '@apollo/client';
import createProject from '../mutations/createProject'

function Form() {
  const [value, setValue] = useState<Date | null>(null);
  const [CreateProject, { data, loading, error }] = useMutation(createProject);

  const form = useForm({
    initialValues: {
      title: "",
      startDate: "",
      endDate: "",
      description: "",
    },

    validate: {
      title: (value) => (/^[a-zA-Z\s]+$/.test(value) ? null : "Invalid name"),
      startDate: (value) => (value ? null : "Start date is required"),
      endDate: (value) => (value ? null : "End date is required"),
      description: (value) =>
        value.length >= 10
          ? null
          : "Description must be at least 10 characters",
    },
  });
  const handleSubmit = async (values:any) => {
    try {
      await CreateProject({ variables: values });
    } catch (error) {
      console.error("err", error);
    }
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />
        <DatePickerInput
          clearable
          defaultValue={new Date()}
          label="Start Date"
          placeholder="pick a date"
          valueFormat="YYYY-MM-DD"
          value={value}
          {...form.getInputProps("startDate")}
        />

        <DatePickerInput
          clearable
          label="End date"
          placeholder="pick a date"
          valueFormat="YYYY-MM-DD"

          value={value}
          {...form.getInputProps("endDate")}
        />

        <Textarea
          size="md"
          label="Project Description"
          placeholder="Write your project Description"
          value={value}
          {...form.getInputProps("description")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default function CreateProject() {
  return (
    <div>
      <h1>./Create Project</h1>

      <Form />
    </div>
  );
}
