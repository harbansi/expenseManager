import { Component, OnInit } from '@angular/core';
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
    showDetails: false,
    transactionList: []
  }
  public flag = {
    showError: false,
    showExpenseData: false,
    showLoader: true,
    showTransactionData: false
  }

  constructor(private expenseService: ExpenseService) {

  }

  ngOnInit() {
    this.getDefaultData();

  }
  getDefaultData() {
    this.dataSource.showDetails = false;
    this.setDetaulFlag();
    this.getbudgetData();
    this.TransactionData();

  }
  setDetaulFlag() {
    this.flag.showTransactionData = false;
    this.flag.showError = false;
    this.flag.showExpenseData = false;
    this.flag.showLoader = true;
  }
  getbudgetData() {
    this.expenseService.getBudget().subscribe((res: any) => {
      this.dataSource.totalBudget = res.data ? res.data : 0;
    });
    this.expenseService.getAllExpenses('main')
      .subscribe((res: any) => {
        this.flag.showLoader = false;
        if (res && res.data) {
          this.dataSource.expenseData = res.data;
          this.dataSource.showDetails = true;
          console.log(this.dataSource.expenseData)

          this.dataSource.totalExpense = this.dataSource.expenseData ? this.dataSource.expenseData.reduce((pre: any, nex: any) => pre + (+nex.amount || 0), 0) : 0
          this.flag.showExpenseData = true
        }
      });
  }
  TransactionData() {
    this.flag.showLoader = true;
    this.expenseService.getTransactionList().subscribe((res: any) => {
      this.flag.showLoader = false;
      this.flag.showTransactionData = true;
      this.dataSource.transactionList = res.data;
    })
  }
}
