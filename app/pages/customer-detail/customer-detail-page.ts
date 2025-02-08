import { NavigatedData, Page } from '@nativescript/core';
import { CustomerDetailViewModel } from './customer-detail-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const customerId = page.navigationContext.customerId;
    page.bindingContext = new CustomerDetailViewModel(customerId);
}