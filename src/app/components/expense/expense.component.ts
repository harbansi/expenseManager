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
  categoryList!: string[];
  showCategoryField: boolean = false;
  constructor(private expenseService: ExpenseService) {

  }

  get expenseFormControl() {
    return this.expenseForm.controls;
  }
  ngOnInit(): void {
    this.showCategoryField = false
    this.expenseService.getAllCategories('main').subscribe((res: any) => {
      this.categoryList = Object.keys(res.data);
      console.log(this.categoryList);

      this.categoryList.push('create New Category')

    });
    this.expenseForm = new FormGroup({
      label: new FormControl(['', [Validators.required]]),
      amount: new FormControl([0, [Validators.required]]),
      categories: new FormControl([null]),
      newCategory: new FormControl('')
    });
  }

  onSubmitExpense() {
    this.submitted = true;
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value)

      const postData = { expense: { label: this.expenseForm.value.label, amount: this.expenseForm.value.amount, category: this.showCategoryField ? this.expenseForm.value.newCategory : this.expenseForm.value.categories }, title: 'main' }
      console.log(postData)
      this.expenseService.addExpense(postData, 'main').subscribe((res: any) => {
        console.log(res)
      });
      this.resetForm()
    }
  }
  onChangeCategory(event: any) {
    console.log()
    if (this.expenseForm.value.categories == 'create New Category') {
      console.log('dj', this.showCategoryField)
      this.showCategoryField = true;
    } else {
      this.showCategoryField = false;
    }
  }
  resetForm() {
    this.expenseForm.reset();
  }
}
