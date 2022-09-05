import { Customer } from "./Customer";

export async function searchCustomers(): Promise<Customer[]> {
  const url = process.env.REACT_APP_API + "/customers";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
  // if (!localStorage["customers"]) {
  //   localStorage["customers"] = "[]";
  // }
  // let customers = localStorage["customers"];
  // return JSON.parse(customers);
}

export async function removeCustomer(id: string) {
  const url = process.env.REACT_APP_API + `/customers/${id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const customers = searchCustomers();
  // const indice = customers.findIndex((customer: Customer) => customer.id === id);
  // customers.splice(indice, 1);
  // localStorage["customers"] = JSON.stringify(customers);
}

export async function saveCustomer(customer: Customer) {
  const url = process.env.REACT_APP_API + "/customers";
  if (customer.id) {
    await fetch(url + "/" + customer.id, {
      method: "PUT",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // const customers = searchCustomers();
  // if (customer.id) {
  //   const indice = customers.findIndex((c: Customer) => c.id === customer.id);
  //   customers[indice] = customer;
  // } else {
  //   customer.id = String(Math.round(Math.random() * 10000));
  //   customers.push(customer);
  // }
  // localStorage["customers"] = JSON.stringify(customers);
}

export async function searchCustomerById(id: string): Promise<Customer> {
  const url = process.env.REACT_APP_API + `/customers/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
  // const customers = searchCustomers();
  // return customers.find((customer: Customer) => customer.id === id);
}
