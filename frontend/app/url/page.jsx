import { urlColumns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/DataTable";
import { getURLData } from "@/services";

export default async function page() {
  const urlData = await getURLData();
  return (
    <section className="container mx-auto mb-6">
      <DataTable
        columns={urlColumns}
        data={urlData}
        searchTitle="URL"
        searchKeyword="url"
      />
    </section>
  );
}
