import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import ProductList from "./_components/product-list";

const ProductsPage = async () => {
  // chamar banco de dados
  //const products = await db.product.findMany();

  // Usando DLA
  // const products = await getProducts();

  // Usando Route Handlers
  const response = await fetch("http://localhost:3000/api/products", {
    // cache: "no-cache",
  });
  const products = await response.json();

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de
          </span>
          <h2 className="text-2xl font-semibold">Produtos</h2>
        </div>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </div>

      <ProductList />
      <p>{products}</p>
      {/* <DataTable columns={productsTableColumns} data={products} /> */}
    </div>
  );
};

export default ProductsPage;
