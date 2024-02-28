import { Injectable } from '@angular/core';
import { Emp } from '../models/emp';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Emp[] = [];

  constructor() {}

  getEmployees(): Emp[] {
    return this.employees;
  }

  getEmployeeById(id: number): Emp | undefined {
    return this.employees.find((e) => e.empId === id);
  }

  addEmployee(employee: Emp): void {
    const id =
      this.employees.length > 0
        ? this.employees[this.employees.length - 1].empId + 1
        : 1;
    employee.empId = id;
    this.employees.push(employee);
  }

  updateEmployee(id: number, employeeData: Emp): void {
    const index = this.employees.findIndex((e) => e.empId === id);
    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...employeeData };
    }
  }

  deleteEmployee(id: number): void {
    const index = this.employees.findIndex((e) => e.empId === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }
}
