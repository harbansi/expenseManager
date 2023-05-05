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

    addExpense(postData: any) {
        return this.httpClient.post(`${base_URL}/expense`, postData);

    }

    getAllCategories(title: string) {
        return this.httpClient.get(`${base_URL}/category/${title}`);
    }
    AddBudget() {

    }
    getBudget() {
        return this.httpClient.get(`${base_URL}/budget/My Budget 1`);
    }

}