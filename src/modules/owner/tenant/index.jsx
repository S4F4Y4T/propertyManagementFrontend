import Table from "./components/Table.jsx";

export default function Index() {
  return (
      <div>
          <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
              <div>
                  <h2 className='text-2xl font-bold tracking-tight'>Tenant List</h2>
                  <p className='text-muted-foreground'>Manage your Tenant here.</p>
              </div>
          </div>
          <Table />
      </div>
  );
}
