import { domainColumns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/DataTable";
import { getDomainData } from "@/services";

export default async function page() {
  const urlData = await getDomainData();
  return (
    <section className="container mx-auto mb-6">
      <DataTable
        columns={domainColumns}
        data={urlData}
        searchTitle="Domain"
        searchKeyword="domain"
      />
    </section>
  );
}
