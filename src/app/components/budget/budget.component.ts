import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { base_URL } from 'src/env/environment';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budgetForm!: FormGroup;

  constructor(private http: HttpClient) { }

  submitted: boolean = false;
  get budgetFormControl() {
    return this.budgetForm.controls;
  }
  ngOnInit(): void {
    this.budgetForm = new FormGroup({
      label: new FormControl(''),
      amount: new FormControl(''),
    });
  }

  onSubmitBudget() {
    this.submitted = true;
    if (this.budgetForm.valid) {
      console.log(this.budgetForm.value)
      const postData = { ...this.budgetForm.value };
      this.http.patch(`${base_URL}budget`, postData).subscribe((res: any) => { console.log(res) });
    }
  }
}
