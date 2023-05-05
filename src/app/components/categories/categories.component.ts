import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public expenseData: any = [];
  parsedExpenseData: any;
  constructor(private ExpenseService: ExpenseService) { }
  ngOnInit(): void {

    this.ExpenseService.getAllExpenses('My Budget 1').subscribe((res: any) => {
      this.expenseData = res.data;

      this.parsedExpenseData = this.expenseData.filter((val: any, index: number) => this.expenseData.findIndex((obj: any) => obj.category === val.category) === index)
      console.log(this.parsedExpenseData)
    });
  }

}
