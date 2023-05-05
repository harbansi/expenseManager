import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_URL } from 'src/env/environment';
import { ExpenseService } from 'src/app/services/expenses.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public dataSource: any = {
    totalBudget: 0,
    expenseData: {},
    totalExpense: 0,
    showLoader: true,
    showDetails: false
  }

  constructor(private expenseService: ExpenseService) {

  }

  ngOnInit() {
    this.getData();

  }
  getData() {
    this.dataSource.showDetails = false;
    this.expenseService.getAllExpenses('My Budget 1')
      .subscribe((res: any) => {
        this.dataSource.showLoader = false
        if (res && res.data) {
          this.dataSource.expenseData = res.data;
          this.dataSource.showDetails = true;
          console.log(this.dataSource.expenseData)

          // TODO
          this.dataSource.totalExpense = this.dataSource.expenseData.reduce((pre: any, nex: any) => pre + (+nex.amount || 0), 0)

        } else {

        }
      });

    this.expenseService.getBudget().subscribe((res: any) => {
      this.dataSource.totalBudget = res.data;
    })
  }
}
