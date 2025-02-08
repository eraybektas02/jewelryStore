import { Observable } from '@nativescript/core';
import { customersStore } from '../../store/customers-store';
import { Customer } from '../../models/customer';
import { formatDate } from '../../utils/date-formatter';
import { showImagePreview } from '../../utils/image-preview';

export class CustomerDetailViewModel extends Observable {
    private _customer: Customer;
    private _formattedDate: string;
    private _frontIdImage: string;
    private _backIdImage: string;
    private _formattedAmount: string;

    constructor(customerId: string) {
        super();
        this._customer = customersStore.getCustomerById(customerId);
        this._formattedDate = formatDate(this._customer?.date || new Date());
        this._frontIdImage = this._customer?.frontIdImage || '';
        this._backIdImage = this._customer?.backIdImage || '';
        this._formattedAmount = this._customer ? `${this._customer.amount.toLocaleString('tr-TR')} TL` : '0 TL';
    }

    showFrontIdPreview() {
        if (this._frontIdImage) {
            showImagePreview(this._frontIdImage.replace('data:image/jpeg;base64,', ''));
        }
    }

    showBackIdPreview() {
        if (this._backIdImage) {
            showImagePreview(this._backIdImage.replace('data:image/jpeg;base64,', ''));
        }
    }

    get customer(): Customer {
        return this._customer;
    }

    get formattedDate(): string {
        return this._formattedDate;
    }

    get frontIdImage(): string {
        return this._frontIdImage;
    }

    get backIdImage(): string {
        return this._backIdImage;
    }

    get formattedAmount(): string {
        return this._formattedAmount;
    }
}