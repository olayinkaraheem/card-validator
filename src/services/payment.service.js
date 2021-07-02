import {clients} from "../.data/clients";

export default class PaymentService {
    constructor() {
        this.clients = clients;
    }

    detectCardType = (cardNumber) => {
        if(cardNumber.startsWith("4")) {
            return "Visa";
        } else if (cardNumber.startsWith('5'))  {
            return "Mastercard";
        } else if (cardNumber.startsWith('6'))  {
            return "Discover";
        } else if (cardNumber.startsWith('3') && cardNumber.length === 15)  {
            return "American Express";
        } else if (cardNumber.startsWith('3') && cardNumber.length === 14)  {
            return "Diners Club Or Carte Blanche";
        } else {
            return "Unknown";
        }

    }

    validateCardExpiryDate = (cardExpiryDate) => {
        if(this.expiryDateFormatIsValid(cardExpiryDate)) {

            const expiryDate = cardExpiryDate.split('/');
            const expiryMonth  = +expiryDate[0];
            const expiryYear = +expiryDate[1]+100;
            const date = new Date();
            const thisYear = date.getYear();
            const thisMonth = date.getMonth()+1;
            const expiryDateIsValid = expiryDate.length == 2 ? true : false;
            if(expiryDateIsValid && ( expiryYear > thisYear || ( expiryYear == thisYear && expiryMonth >= thisMonth && expiryMonth <= 12 ) )) {
                return {
                    error: false,
                    code: 200,
                    message: 'Success'
                };
            } else {
                return {
                    message: 'Card Is Expired. Please try again.',
                    error: true,
                    code: 400
                };
            }

        } else {
            return {
                message: 'Invalid Date Format. Format should be mm/yy. Please try again.',
                error: true,
                code: 400
            }
        }

    }

    expiryDateFormatIsValid = (expiryDate) => {
        const dateFormat = /^\d{2}[/]\d{2}$/;
        return expiryDate.match(dateFormat) ? true : false;
    }

    validateEmailAddress = (emailAddress) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(emailAddress);
    }

    validatePhoneNumber = (phoneNumber) => {
        return (((phoneNumber.startsWith('234') && phoneNumber.length === 13) || (phoneNumber.startsWith('0') && phoneNumber.length === 11)) && !isNaN(+phoneNumber))
    }

    validateCVV = (CVV, cardType) => {
        // use card type and length of CVV
        console.log('CVV length: ', CVV.length, CVV)
        if((['Visa', 'Mastercard', 'Discover', 'Diners Club Or Carte Blanche', 'Unknown'].includes(cardType) && CVV.length !== 3) || (cardType === 'American Express' && CVV.length !== 4)) {
            return false;
        }
        return true;

    }

    validateWithLuhn = (digits) => {
        const doubleEveryOtherDigitsFromRight = [];
        let doubleDigit = false;
        for( let ind = digits.length -1; ind >= 0; ind--){
            let digit = digits[ind];
            if(doubleDigit){
                if ((digit *= 2) > 9) {
                    digit -= 9;
                }
            }
            doubleEveryOtherDigitsFromRight.push(digit);
            doubleDigit = !doubleDigit;
        }

        const totalOfDigits = doubleEveryOtherDigitsFromRight.reduce( (currentDigit, nextDigit) => {
            return currentDigit + nextDigit;
        });
        return (totalOfDigits % 10) === 0;
    }

    validateCardNumber = (cardNumber) => {
        let cardInputArray = cardNumber.split('');

        const cardInputArrayOfIntegers = cardInputArray.map( digitString => Number(digitString))

        return this.validateWithLuhn(cardInputArrayOfIntegers);
    }

    validateCardDetails(cardData) {
        const {CCNum, ExpiryDate, Email, Phone, CVV2} = cardData;
        const cardType = this.detectCardType(CCNum);
        const isValidCardNumber = this.validateCardNumber(CCNum);
        if (!isValidCardNumber) {
            return {
                message: 'Invalid Card Number. Please try again.',
                error: true,
                code: 400
            }
        }

        const expiry = this.validateCardExpiryDate(ExpiryDate);

        if (expiry.error) {
            return expiry;
        }

        const emailIsValid = this.validateEmailAddress(Email)

        if (!emailIsValid) {

            return {
                message: 'Invalid Email Address. Please try again.',
                error: true,
                code: 400
            }
        }
        const phoneNumberIsValid = this.validatePhoneNumber(Phone)

        if (!phoneNumberIsValid) {
            return {
                message: 'Invalid Phone Number. Please try again.',
                error: true,
                code: 400
            }
        }

        const cvvIsValid = this.validateCVV(CVV2, cardType)

        if (!cvvIsValid) {
            return {
                message: 'Invalid CVV. Please try again.',
                error: true,
                code: 400
            }
        }

        return {
            message: 'Validation successful',
            error: false,
            code: 200,
            data: {
                valid: true,
                cardType
            }
        }
    }
}