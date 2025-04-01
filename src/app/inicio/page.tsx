import { DataTable } from "@/components/data-table";
const data = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "In Process",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake",
  },
];
export default function InicioPage() {
  return (
    <>
    <DataTable title={'Clientes'} data={data}/>
    </>
  )
}
