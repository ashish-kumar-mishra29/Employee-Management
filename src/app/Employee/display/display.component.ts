import { Component, OnInit } from '@angular/core';
import { Emp } from '../../models/emp';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  employees: Emp[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  add(): void {
    this.router.navigate(['/add']);
  }

  fetchEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employee/edit', id]);
  }

  deleteEmployee(id: number, name: string): void {
    const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
      this.employeeService.deleteEmployee(id);
      this.fetchEmployees();
      alert(`The Employee ${name} has been deleted`);
    }
  }
}
