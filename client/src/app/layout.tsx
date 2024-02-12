'use client'

import "./globals.css";
import "@mantine/core/styles.css";
import { Work_Sans } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
 import Client from "./client";
 import { MantineProvider } from "@mantine/core";
import SideBar from "./components/SideBar" 
 import "@mantine/core/styles.css";


 const font = Work_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ApolloProvider client={Client}>
       <html data-mantine-color-scheme="light" lang="en">
        <body className={font.className}>
          <MantineProvider>
            <div className="flex  ">
              <div>
                <SideBar />
              </div>
              <div>{children}</div>
            </div>
          </MantineProvider>
        </body>
      </html>
     </ApolloProvider>
);
}
