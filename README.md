# Card-Validator

A simple Node.js based application to validate credit card information.
It accepts both XML and json requests and responds with json.

## Built With

- [Express](https://expressjs.com)
- [Node.js](https://nodejs.org/en/)

## Installation

1. Download and install [Node.js](https://nodejs.org/en/)

1. Clone project

```bash
    > git clone https://github.com/olayinkaraheem/card-validator.git
```

3. Install Dependencies

```bash
    > npm install
```

4. Run project

```bash
    > npm start
```

## Features

- Client authorization with api-key.
- Email validation.
- Credit Card and CVV2 Validation.
- Phone Number Validation.



## API Routes

| Description                      | HTTP Method | Endpoints                                  |
| -------------------------------- | ----------- | ------------------------------------------ |
| Validates Credit Card Information              | POST        | /api/v1/payment/validate                        |


## Sample Payloads

### Payload Without Amount

```json
{
	"CCNum": "371449635398431", 
	"ExpiryDate": "12/21", 
	"Email": "ola@test.com", 
	"Phone": "2348063188534",
	"CVV2": "1234"
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<root>
  <CCNum>371449635398431</CCNum>
  <ExpiryDate>12/21</ExpiryDate>
  <Email>ola@test.com</Email>
  <Phone>2348063188534</Phone>
  <CVV2>1234</CVV2>
</root>

```

### Payload With Amount

```json
{
	"CCNum": "371449635398431", 
	"ExpiryDate": "12/21", 
	"Email": "ola@test.com", 
	"Phone": "2348063188534",
	"CVV2": "1234",
	"Amount": "5000"
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<root>
  <CCNum>371449635398431</CCNum>
  <ExpiryDate>12/21</ExpiryDate>
  <Email>ola@test.com</Email>
  <Phone>2348063188534</Phone>
  <CVV2>1234</CVV2>
  <Amount>10000</Amount>
</root>
```

## Sample Response
### Success
```json
{
	"valid": true,
	"cardType": "American Express"
}
```

### Error

```json
{
	"message": "Invalid CVV. Please try again."
}
```

## Sample Data

```json
api-key: 45erkjherht45495783
credit cards: "https://www.paypalobjects.com/en_AU/vhelp/paypalmanager_help/credit_card_numbers.htm"
```

## License

&copy; Olayinka Raheem
