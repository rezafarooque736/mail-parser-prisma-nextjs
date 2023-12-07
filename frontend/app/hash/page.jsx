import { hashColumns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/DataTable";
import { getHASHData } from "@/services";

export default async function page() {
  const hashData = await getHASHData();
  return (
    <section className="container mx-auto mb-6">
      <DataTable
        columns={hashColumns}
        data={hashData}
        searchTitle="Hash"
        searchKeyword="hash"
      />
    </section>
  );
}
