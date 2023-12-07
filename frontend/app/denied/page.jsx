export default function Denied() {
  return (
    <section className="flex items-center justify-center h-[85vh]">
      <div className="p-8 text-center bg-white rounded shadow-md">
        <h1 className="mb-4 text-4xl font-bold text-destructive">
          Access Denied
        </h1>
        <p className="text-slate-700">
          You do not have permission to access this page.
        </p>
      </div>
    </section>
  );
}
