import { Observable } from '@nativescript/core';
import { Customer } from '../models/customer';
import { formatDate } from '../utils/date-formatter';

class CustomersStore extends Observable {
    private customers: Array<Customer & { formattedDate: string; formattedAmount: string }> = [];
    private filteredCustomers: Array<Customer & { formattedDate: string; formattedAmount: string }> = [];
    private searchQuery: string = '';

    constructor() {
        super();
        this.filteredCustomers = this.customers;
    }

    addCustomer(customer: Customer) {
        const formattedCustomer = {
            ...customer,
            formattedDate: formatDate(customer.date),
            formattedAmount: `${Number(customer.amount).toLocaleString('tr-TR')} TL`
        };
        
        this.customers.unshift(formattedCustomer);
        this.filterCustomers();
    }

    getCustomerById(id: string) {
        return this.customers.find(customer => customer.id === id);
    }

    filterCustomers() {
        if (this.searchQuery.trim() === '') {
            this.filteredCustomers = [...this.customers];
        } else {
            const query = this.searchQuery.toLowerCase();
            this.filteredCustomers = this.customers.filter(customer => {
                const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
                return fullName.includes(query);
            });
        }
        this.notifyPropertyChange('filteredCustomers', this.filteredCustomers);
    }

    setSearchQuery(query: string) {
        this.searchQuery = query;
        this.filterCustomers();
    }
    

    get getFilteredCustomers() {
        return this.filteredCustomers;
    }
}

export const customersStore = new CustomersStore();