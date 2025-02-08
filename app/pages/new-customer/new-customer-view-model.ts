import { Observable } from '@nativescript/core';
import { takePicture, requestPermissions } from '@nativescript/camera';
import { ImageSource } from '@nativescript/core';
import { customersStore } from '../../store/customers-store';
import { Customer } from '../../models/customer';

export class NewCustomerViewModel extends Observable {
    private _frontIdImage: string = '';
    private _backIdImage: string = '';
    private _firstName: string = '';
    private _lastName: string = '';
    private _occupation: string = '';
    private _address: string = '';
    private _amount: string = '';
    private _date: Date = new Date();

    constructor() {
        super();
        requestPermissions();
    }

    async captureFrontId() {
        try {
            const imageAsset = await takePicture({
                width: 1024,
                height: 1024,
                keepAspectRatio: true,
                saveToGallery: true
            });

            if (imageAsset) {
                const imageSource = await ImageSource.fromAsset(imageAsset);
                this.frontIdImage = imageSource.toBase64String('jpg');
            }
        } catch (error) {
            console.error('Error capturing front ID:', error);
        }
    }

    async captureBackId() {
        try {
            const imageAsset = await takePicture({
                width: 1024,
                height: 1024,
                keepAspectRatio: true,
                saveToGallery: true
            });

            if (imageAsset) {
                const imageSource = await ImageSource.fromAsset(imageAsset);
                this.backIdImage = imageSource.toBase64String('jpg');
            }
        } catch (error) {
            console.error('Error capturing back ID:', error);
        }
    }

    save() {
        if (this.canSave) {
            const customer: Customer = {
                id: Date.now().toString(),
                firstName: this._firstName,
                lastName: this._lastName,
                occupation: this._occupation,
                address: this._address,
                amount: parseFloat(this._amount),
                date: this._date,
                frontIdImage: this._frontIdImage ? `data:image/jpeg;base64,${this._frontIdImage}` : '',
                backIdImage: this._backIdImage ? `data:image/jpeg;base64,${this._backIdImage}` : ''
            };

            customersStore.addCustomer(customer);
            this.resetForm();
        }
    }

    private resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.occupation = '';
        this.address = '';
        this.amount = '';
        this.frontIdImage = '';
        this.backIdImage = '';
        this.date = new Date();
    }

    get canSave(): boolean {
        return (
            this._firstName.length > 0 &&
            this._lastName.length > 0 &&
            this._occupation.length > 0 &&
            this._address.length > 0 &&
            this._amount.length > 0 &&
            this._frontIdImage !== '' &&
            this._backIdImage !== ''
        );
    }

    // Getters and setters
    get firstName(): string {
        return this._firstName;
    }
    set firstName(value: string) {
        if (this._firstName !== value) {
            this._firstName = value;
            this.notifyPropertyChange('firstName', value);
            this.notifyPropertyChange('canSave', this.canSave);
        }
    }

    get lastName(): string {
        return this._lastName;
    }
    set lastName(value: string) {
        if (this._lastName !== value) {
            this._lastName = value;
            this.notifyPropertyChange('lastName', value);
            this.notifyPropertyChange('canSave', this.canSave);
        }
    }

    get occupation(): string {
        return this._occupation;
    }
    set occupation(value: string) {
        if (this._occupation !== value) {
            this._occupation = value;
            this.notifyPropertyChange('occupation', value);
            this.notifyPropertyChange('canSave', this.canSave);
        }
    }

    get address(): string {
        return this._address;
    }
    set address(value: string) {
        if (this._address !== value) {
            this._address = value;
            this.notifyPropertyChange('address', value);
            this.notifyPropertyChange('canSave', this.canSave);
        }
    }

    get amount(): string {
        return this._amount;
    }
    set amount(value: string) {
        if (this._amount !== value) {
            this._amount = value;
            this.notifyPropertyChange('amount', value);
            this.notifyPropertyChange('canSave', this.canSave);
        }
    }

    get date(): Date {
        return this._date;
    }
    set date(value: Date) {
        if (this._date !== value) {
            this._date = value;
            this.notifyPropertyChange('date', value);
        }
    }

    get frontIdImage(): string {
        return this._frontIdImage;
    }
    set frontIdImage(value: string) {
        if (this._frontIdImage !== value) {
            this._frontIdImage = value;
            this.notifyPropertyChange('frontIdImage', value);
            this.notifyPropertyChange('canSave', this.canSave);
        }
    }

    get backIdImage(): string {
        return this._backIdImage;
    }
    set backIdImage(value: string) {
        if (this._backIdImage !== value) {
            this._backIdImage = value;
            this.notifyPropertyChange('backIdImage', value);
            this.notifyPropertyChange('canSave', this.canSave);
        }
    }
}