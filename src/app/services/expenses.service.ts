import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_URL } from 'src/env/environment';

@Injectable({
    providedIn: 'root',
})
export class ExpenseService {

    constructor(private httpClient: HttpClient) {

    }

    getAllExpenses(BudgetTitle: string) {
        return this.httpClient.get(`${base_URL}/expense/${BudgetTitle}`);
    }

    addExpense(postData: any, title: string) {
        return this.httpClient.post(`${base_URL}/expense/${title}`, postData);

    }

    getAllCategories(title: string) {
        return this.httpClient.get(`${base_URL}/category_expense/${title}`);
    }
    setBudget(postData: any) {
        return this.httpClient.post(`${base_URL}/budget`, postData);
    }
    getBudget() {
        return this.httpClient.get(`${base_URL}/budget/main`);
    }

    appendToBudget(postData: any) {
        return this.httpClient.patch(`${base_URL}/budget/main`, postData);
    }

    getTransactionList() {
        return this.httpClient.get(`${base_URL}/transactionList`);

    }

}