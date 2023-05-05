import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { every } from 'rxjs';
import { ExpenseService } from 'src/app/services/expenses.service';
import { base_URL } from 'src/env/environment';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  expenseForm!: FormGroup;
  submitted: boolean = false;
  categoryList: [string] = [''];
  constructor(private http: HttpClient, private expenseService: ExpenseService) {

  }

  get expenseFormControl() {
    return this.expenseForm.controls;
  }
  ngOnInit(): void {

    this.expenseService.getAllExpenses('My Budget 1').subscribe((res: any) => {
      this.categoryList = res.data.map((i: any) => i.Category);
    })
    this.expenseForm = new FormGroup({
      label: new FormControl(['', Validators.required]),
      amount: new FormControl([0, Validators.required]),
      categories: new FormControl('')
    });
  }

  onSubmitExpense() {
    this.submitted = true;
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value)

      const postData = { expense: { ...this.expenseForm.value }, title: 'My Budget 1' }
      this.expenseService.addExpense(postData).subscribe((res: any) => {
        console.log(res)
      });
    }
  }
  onChangeCategory(event: any) {
    if (event.target.value == 'create New Category') {
      console.log('svh')
    }
  }
  resetForm() {
    this.expenseForm.reset();
  }
}
