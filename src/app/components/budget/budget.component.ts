import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expenses.service';
import { base_URL } from 'src/env/environment';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budgetForm!: FormGroup;

  setNewBudgetForm!: FormControl;
  constructor(private http: HttpClient, private expenseService: ExpenseService) { }

  submitted: boolean = false;
  get budgetFormControl() {
    return this.budgetForm.controls;
  }

  ngOnInit(): void {
    this.budgetForm = new FormGroup({
      label: new FormControl(''),
      amount: new FormControl(''),
    });
    this.setNewBudgetForm = new FormControl(['main', Validators.required]);

  }

  onSubmitAppendBudget() {
    this.submitted = true;
    if (this.budgetForm.valid) {
      console.log(this.budgetForm.value)
      const postData = { ...this.budgetForm.value };
      this.expenseService.appendToBudget(postData).subscribe((res: any) => { console.log(res) });
      this.resetForm();
    }
  }
  setBudget() {
    const postData = { amount: this.setNewBudgetForm.value, title: 'main' }
    console.log(postData)
    this.expenseService.setBudget(postData).subscribe(res => console.log(res))
    this.setNewBudgetForm.reset();
  }
  resetForm() {
    this.budgetForm.reset();
  }
}
