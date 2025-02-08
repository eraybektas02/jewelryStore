import { Observable } from '@nativescript/core';
import { customersStore } from '../../store/customers-store';
import { Customer } from '../../models/customer';

export class CustomersViewModel extends Observable {
    private _searchQuery: string = '';

    constructor() {
        super();
    }

    get customers(): Array<Customer & { formattedDate: string; formattedAmount: string }> {
        return customersStore.getFilteredCustomers;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
        }
    }

    onSearchQueryChanged(args: any) {
        const searchBar = args.object;
        customersStore.setSearchQuery(searchBar.text);
        this.notifyPropertyChange('customers', this.customers);
    }
}