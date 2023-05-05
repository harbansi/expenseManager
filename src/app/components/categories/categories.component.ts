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

    this.ExpenseService.getAllCategories('main').subscribe((res: any) => {
      this.expenseData = res.data;
      this.parsedExpenseData = Object.keys(this.expenseData).map(key => {
        return { amount: this.expenseData[key], category: key };
      });
      console.log(this.parsedExpenseData)

    });
  }

}
