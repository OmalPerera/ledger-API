# Ledger Rest API

> Calculats ledger for a given lease data

[![Express Logo](https://i.stack.imgur.com/NCL1g.png)](http://expressjs.com/)

*************

&nbsp;
## Installation

Clone the repo, install the dependencies and start the server.

```sh
git clone https://github.com/OmalPerera/ledger-API.git
cd ledger-API
npm i
npm start
```
&nbsp;

## Swagger documentation

- Api documentation is available on `/api/docs/` route.
- http://localhost:3000/api/docs/ (if you are running on localhost)
&nbsp;

## Using the service

### 1. Getting Authenticate
- A mock user is hardcoded in the app just to mimic the auth process.
- You can obtain a token by calling http://localhost:3000/api/v1/login with following payload 
** following credentials are just for testing.  
```
{
    "email": "admin@company.com",
    "password": "5f4dcc3b5aa765d61d8327deb882cf99"
}
```
- Obtain the Beare token and get authorized.
- ** don't foget to user `Bearer` in front of the token.

### 2. Using the lease endpoint
* Once you are authenticated, you can use the service.
* GET http://localhost:3000/api/v1/lease
* following information should be provided as **query parameters** to obtain the ledger.
    * `startDate` - ISO String - (Start date of the ledger)
    * `endDate` - ISO String - (end date of the ledger)
    * `frequency` - weekly | 'fortnightly | monthly , as a string 
    * `weeklyRent` - number format - (Payment frequency of the ledger)
    * `timezone` - string format - (timezone of the property)
* Sample request in localhost :
    * http://localhost:3000/api/v1/lease?startDate=2021-03-16T00%3A00%3A00Z&endDate=2021-05-26T00%3A00%3A00Z&frequency=WEEKLY&weeklyRent=200&timezone=Australia%2FVictoria
* Sample responses can be found on swagger doc. 
&nbsp;

## Testing

Unit testing has been implemented for important logic functions using Jest.
To run unit test cases.
```sh
cd ledger-API
npm test
```
&nbsp;


## License
MIT
