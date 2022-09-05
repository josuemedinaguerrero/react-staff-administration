import { Employee } from "./Employee";

export async function searchEmployees(): Promise<Employee[]> {
  const url = process.env.REACT_APP_API + "/employees";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
  // if (!localStorage["employees"]) {
  //   localStorage["employees"] = "[]";
  // }
  // let employees = localStorage["employees"];
  // return JSON.parse(employees);
}

export async function removeEmployee(id: string) {
  const url = process.env.REACT_APP_API + `/employees/${id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const employees = searchEmployees();
  // const indice = employees.findIndex((employee: Employee) => employee.id === id);
  // employees.splice(indice, 1);
  // localStorage["employees"] = JSON.stringify(employees);
}

export async function saveEmployee(employee: Employee) {
  const url = process.env.REACT_APP_API + "/employees";
  if (employee.id) {
    await fetch(url + "/" + employee.id, {
      method: "PUT",
      body: JSON.stringify(employee),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(employee),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // const employees = searchEmployees();
  // if (employee.id) {
  //   const indice = employees.findIndex((c: Employee) => c.id === employee.id);
  //   employees[indice] = employee;
  // } else {
  //   employee.id = String(Math.round(Math.random() * 10000));
  //   employees.push(employee);
  // }
  // localStorage["employees"] = JSON.stringify(employees);
}

export async function searchEmployeeById(id: string): Promise<Employee> {
  const url = process.env.REACT_APP_API + `/employees/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
  // const Employees = searchEmployees();
  // return Employees.find((employee: Employee) => employee.id === id);
}
