import "./globals.css";
import Header from "./(providers)/(auth)/_components/Header";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <title>job-notice</title>
      </head>
      <body className="bg-gray-100">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
