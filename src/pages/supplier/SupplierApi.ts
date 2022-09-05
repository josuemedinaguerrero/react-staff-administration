import { Supplier } from "./Supplier";

export async function searchSupplier(): Promise<Supplier[]> {
  const url = process.env.REACT_APP_API + "/suppliers";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
  // if (!localStorage["suppliers"]) {
  //   localStorage["suppliers"] = "[]";
  // }
  // let supplier = localStorage["suppliers"];
  // return JSON.parse(supplier);
}

export async function removeSuppier(id: string) {
  const url = process.env.REACT_APP_API + `/suppliers/${id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const suppliers = searchSupplier();
  // const indice = suppliers.findIndex((supplier: Supplier) => supplier.id === id);
  // suppliers.splice(indice, 1);
  // localStorage["suppliers"] = JSON.stringify(suppliers);
}

export async function saveSupplier(supplier: Supplier) {
  const url = process.env.REACT_APP_API + "/suppliers";
  if (supplier.id) {
    await fetch(url + "/" + supplier.id, {
      method: "PUT",
      body: JSON.stringify(supplier),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(supplier),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // const suppliers = searchSupplier();
  // if (supplier.id) {
  //   const indice = suppliers.findIndex((c: Supplier) => c.id === supplier.id);
  //   suppliers[indice] = supplier;
  // } else {
  //   supplier.id = String(Math.round(Math.random() * 10000));
  //   suppliers.push(supplier);
  // }
  // localStorage["suppliers"] = JSON.stringify(suppliers);
}

export async function searchSupplierById(id: string): Promise<Supplier> {
  const url = process.env.REACT_APP_API + `/suppliers/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
  // const supplier = searchSupplier();
  // return supplier.find((supplier: Supplier) => supplier.id === id);
}
