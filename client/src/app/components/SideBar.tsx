'use client'
import { useRouter } from 'next/navigation'

import "@mantine/core/styles.css";
import { useState } from "react";
import { Group } from "@mantine/core";
import { IconUsers, IconFilePencil, IconList } from "@tabler/icons-react";
import Image from "next/image";

import classes from "./SideBar.module.css";
import logo from "../assets/logo.png";

const data = [
  { link: "/employees", label: "Employees", icon: IconUsers },
  { link: "/projects", label: "Projects", icon: IconFilePencil },
  { link: "/tasks", label: "Tasks", icon: IconList },

];

export default function SideBar() {
  const router = useRouter()

  const [active, setActive] = useState("Employees");

  const links = data.map((item) => (
    <a
      key={item.label} 
      className={classes.link}
      data-active={item.label === active || undefined}
      onClick={(event) => {
        router.push(item.link)
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={`${classes.navbar} ${classes.active}`}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Image
            width={100}
            alt="Picture of the author"
            src={logo as unknown as string}
          />
        </Group>
        {links}
      </div>
    </nav>
  );
}
