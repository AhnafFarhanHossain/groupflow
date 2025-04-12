import { Rethink_Sans } from "next/font/google";
import "./globals.css";

const rethinkSans = Rethink_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "GroupFlow - Group Collaboration Project Management Tool",
  description:
    "GroupFlow is a student-focused platform that helps you manage group projects, tasks, and collaboration effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rethinkSans.className}>
      <body>{children}</body>
    </html>
  );
}
