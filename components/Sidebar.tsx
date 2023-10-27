import { generateRoutemap } from "@/lib/content-loader";

export default function Sidebar() {
  const routemap = generateRoutemap();
  console.log(routemap);

  return (
    <div className="sidebar">
      <h1>Sidebar</h1>
    </div>
  );
}
