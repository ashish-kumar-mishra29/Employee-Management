import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Emp } from '../../models/emp';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  form: FormGroup; // Form group for employee data
  isEditMode = false; // Flag to track edit mode
  empId: number | null = null; // ID of the employee being edited
  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    // Initialize form group structure
    this.form = this.formBuilder.group({
      empId: ['', Validators.required],
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      skills: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    // Fetch employee ID from route parameters
    const id = this.route.snapshot.paramMap.get('id');
    // If ID exists, set edit mode and fetch employee data
    if (id) {
      this.isEditMode = true;
      this.empId = +id;
      const employee = this.employeeService.getEmployeeById(this.empId);
      this.buildForm(employee);
    } else {
      // If no ID, add a new skill (for new employee)
      this.addSkill();
    }
  }

  // Build the form based on employee data
  buildForm(employee: Emp | undefined): void {
    if (employee) {
      // Patch form values with employee data
      this.form.patchValue(employee);
      // Add skills to the form
      employee.skills?.forEach(skill => {
        this.addSkill(skill.name, skill.experience);
      });
    }
  }

  // Handle form submission
  onSubmit(): void {
    // If form is invalid, do nothing
    if (this.form.invalid) return;
    // Extract form data
    const employeeData: Emp = this.form.value;
    // Update or add employee data based on edit mode
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.empId!, employeeData);
    } else {
      this.employeeService.addEmployee(employeeData);
    }
    // Navigate back to default route
    this.router.navigate(['']);
  }

  // Accessor for skills form array
  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  // Add a new skill to the form
  addSkill(skillName: string = '', experience: string = ''): void {
    this.skills.push(this.formBuilder.group({
      name: [skillName, Validators.required],
      experience: [experience]
    }));
  }

  // Delete a skill from the form
  // Remove skill at specified index
  deleteSkill(index: number): void {
    this.skills.removeAt(index);
    if (this.skills.length === 1) {
      const skillControl = this.skills.controls[0].get('name');
      if (skillControl) {
        skillControl.enable();
      }
    }
  }
}
