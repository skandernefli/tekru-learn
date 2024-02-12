"use client";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import {useMutation } from '@apollo/client';
import updateEmployee from '../../../mutations/updateEmployee';

function Form({id}:{id:any}) {
  const [UpdateEmployee, { data, loading, error }] = useMutation(updateEmployee);

  const form = useForm({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
    },
    validate: {
      name: (value) => (/^[a-zA-Z\s]+$/.test(value) ? null : "Invalid name"),
      phoneNumber: (value) => (/^\+?[0-9]+([-.\s]?[0-9]+)*$/.test(value) ? null : "Invalid phone number"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values:any) => {
    try {
        
      await UpdateEmployee({ variables:  { updateEmployeeId:id, ...values} });
    } catch (error) {
      console.error("err", error);
    }
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
          error={form.errors.name}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          error={form.errors.email}
        />
        <TextInput
          withAsterisk
          label="Phone Number"
          placeholder="333 3666 5554"
          {...form.getInputProps("phoneNumber")}
          error={form.errors.phoneNumber}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default function UpdateEmployee({params}) {
  return (
    <div>
      <h1>./Update Employee {params.id}</h1>
      <Form id={params.id} />
    </div>
  );
}
