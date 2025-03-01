import { NavigatedData, Page } from '@nativescript/core';
import { NewCustomerViewModel } from './new-customer-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new NewCustomerViewModel();
}