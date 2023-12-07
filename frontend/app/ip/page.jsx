import { ipColumns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/DataTable";
import { getIPData } from "@/services";

export default async function page() {
  const ipData = await getIPData();
  return (
    <section className="container mx-auto mb-6">
      <DataTable
        columns={ipColumns}
        data={ipData}
        searchTitle="IP"
        searchKeyword="ip"
      />
    </section>
  );
}
