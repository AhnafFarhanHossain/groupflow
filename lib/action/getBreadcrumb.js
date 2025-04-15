export default function getBreadcrumbs(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  let path = "";

  // Start with dashboard as the root
  const breadcrumbs = [
    {
      name: "Dashboard",
      href: "/dashboard",
      isLast: parts.length === 1 && parts[0] === "dashboard",
    },
  ];

  // Add subsequent parts
  parts.forEach((part, idx) => {
    if (part !== "dashboard") {
      path = `/${parts.slice(0, idx + 1).join("/")}`;
      breadcrumbs.push({
        name: part.charAt(0).toUpperCase() + part.slice(1),
        href: path,
        isLast: idx === parts.length - 1,
      });
    }
  });

  return breadcrumbs;
}
