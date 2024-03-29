"use client";
import { useState, useEffect } from "react";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import getTasks from "../queries/getTasks";
import { useQuery,useMutation } from "@apollo/client";
import deleteTask from '../mutations/deleteTask'
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "../../app/table.module.css";
interface RowData {
  title: string;
  id: string;
  description: string;
  projectId: string;
  employeeId: string;

}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function DeleteButton({ onClick }: { onClick: () => Promise<void> }) {
  const buttonStyle = {
    marginRight: "10px",
  };
  return (
    <Button variant="filled" color="red" style={buttonStyle}  onClick={onClick}>
      Delete
    </Button>
  );
}
function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="filled" color="yellow"   onClick={onClick}>
      Edit
    </Button>
  );
}

function CreateButton() {
  const router = useRouter();
  const buttonStyle = {
    left: "61vw",
  };
  return (
    <Button
      variant="filled"
      color="teal"
      style={buttonStyle}
      onClick={() => {
        router.push("/createtask");
      }}
    >
      Create
    </Button>
  );
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();

  if (!data.length || !data[0]) {
    return [];
  }

  return data.filter((item) =>
    keys(data[0]).some((key) => {
      const itemValue = item[key];
      return itemValue && itemValue.toString().toLowerCase().includes(query);
    })
  );
}
function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export default function EmployeeTable() {
  const {
    loading,
    error,
    data: queryData,
  } = useQuery(getTasks);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [sortedData, setSortedData] = useState(queryData?.getTasks || []);

  useEffect(() => {
    setSortedData(
      sortData(queryData?.getTasks || [], {
        sortBy,
        reversed: reverseSortDirection,
        search,
      })
    );
  }, [queryData, sortBy, reverseSortDirection, search]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };
const router=useRouter();
const [DeleteTask, { data, loading:deletionInProgress, error:deletionError }] = useMutation(deleteTask);
  const handleDeletion = async (id:any) => {
    try {
      await DeleteTask({ variables: { deleteTaskId: id } });
    } catch (error) {
      console.error("err", error);
    }
  };
  const rows = sortedData.map((row:any) => (
    <Table.Tr key={row.id}>
      <Table.Td onClick={() => router.push(`/tasks/${row.id}`)}  style={{ cursor: 'pointer' }}>{row.title}</Table.Td>
      <Table.Td onClick={() => router.push(`/tasks/${row.id}`)}  style={{ cursor: 'pointer' }}>{row.description}</Table.Td>
      <Table.Td onClick={() => router.push(`/tasks/${row.id}`)}  style={{ cursor: 'pointer' }}> {row.projectId}</Table.Td>
      <Table.Td onClick={() => router.push(`/tasks/${row.id}`)}  style={{ cursor: 'pointer' }}> {row.employeeId}</Table.Td>

      <Table.Td>
        <DeleteButton   onClick={()=>handleDeletion(row.id) } />
        <EditButton   onClick={() => router.push(`/tasks/update/${row.id}`)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <CreateButton />
      {loading ? (
        <div>loading</div>
      ) : error ? (
        <div>error </div>
      ) : (
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>
              <Th
                sorted={sortBy === "title"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("title")}
              >
                title
              </Th>
              <Th
                sorted={sortBy === "description"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("description")}
              >
                description
              </Th>
              <Th
                sorted={sortBy === "projectId"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("projectId")}
              >
                projectId
              </Th>
              <Th
                sorted={sortBy === "employeeId"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("employeeId")}
              >
                employeeId
              </Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {sortedData.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={1}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      )}
    </ScrollArea>
  );
}

