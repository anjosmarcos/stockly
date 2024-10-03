import { DataTable } from "../_components/ui/dataTable";
import { cacheGetProducts } from "../_data-access/get-products";
import CreatedProductButton from "./_components/create-products-button";
import { productsTableColumns } from "./_components/table-columns";

const ProductsPage = async () => {
  const products = await cacheGetProducts();

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de
          </span>
          <h2 className="text-2xl font-semibold">Produtos</h2>
        </div>{" "}
        <CreatedProductButton />
      </div>

      <DataTable
        columns={productsTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
