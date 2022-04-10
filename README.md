
# Verify

This is a project started because I wanted a way to streamline error checking & throwing a custom error with built in html status codes.
In a way where it can be chained
```javascript
// example
const target = 'string'
Verify(target).isString()
Verify(target).isNumber() // will throw an ErrorException. 
/* ErrorException:
    message: 'string must be a number',
    statusCode: 400,
*/
```



## Features
Checks done by Verify
- Base Check
  - isDefined - null/undefined
- Types
  - isString
  - isNumber
  - isInt
  - isBoolean
  - isArray
- Comparison
  - isEquals === 
  - isGT >
  - isGTE >=
  - isLT <
  - isLTE <=
- ErrorException
  - standard error messages per type/comparison Check
  - default 400 statusCode (can be changed)
## Example

```javascript
import Verify from 'verify';
```
checking for a number & the properties in Verify
```javascript
const numberVerify = Verify('1', { name: 'number test' }).isNumber();
const { value, type, error, failed, steps, verifiedNumber, compared } = numberVerify;
// value = 'string'
// type = 'string'
// error = false
// failed = false
// steps = func
// steps('isDefined') = true
// steps('isString') = true
// steps() = Map(2) { 'isDefined' => true, 'isString' => true }
// verifiedNumber = BigJS -> changes when .isNumber() is chained
// compare = null -> will change when a comparison is chained
numberVerify.isGT(0);
// steps() = Map(3) { 'isDefined' => true, 'isNumber' => true, 'isGT' => true }
// compare = 0
numberVerify.isLTE(0); // throws an ErrorException
/* ErrorException:
    message: number test must be <= 0
    statusCode: 400
*/

```
## Documentation

let's walk through the app! \
all of the options are -- optional :)
### Initial
```javascript
Verify(value, options)
```
**value**: any = object to be verified\
**options**: object =  initial options for Verify
```javascript
options = {
  soft: boolean,
  missing: string,
  status: number,
  name: string,
}
```
**soft** - will not throw an error
  - for the cases when you do want to check or maybe debug
  - the error, failed booleans & steps function will come in handy!
**missing** - when *value* evaluates as null/undefined, this will be the error message \
  - by default it is "missing value"
**status** - html error code [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), [GO](https://go.dev/src/net/http/status.go) \
**name** - if you want to name the **value**, by default it will be the **value** itself


### TypeCheck
```javascript
Verify()
    .isNumber(options)
    .isInt(options)
    .isString(options)
    .isBoolean(options)
    .isArray(options)
```
for these options it will affect the typecheck chaining
```javascript
options = {
    message: string,
    status: number,
}
```
**message** - this will be the error message
  - by default it is "**value** must be a(n) **type**"
**status** - this will be the HTML error status code

### Comparison
note, isEquals does not support deep array or object comparisons (yet, maybe). \
this is a VERY basic equals.
```javascript
-- chain
  .isEquals(compare, options)
```
must have `isNumber()` chained prior to use these. \
leverages [BigJs](https://mikemcl.github.io/big.js/)
```javascript
-- chain
  .isGT(compare, options)
  .isGTE(compare, options)
  .isLT(compare, options)
  .isLTE(compare, options)
```
**compare** - object to *compare* against **value**
```javascript
options = {
    message: string,
    status: number,
    compareName: string,
}
```
**message** - this will be the error message
  - by default it is "**value** must be **operator** **type**"
  - operator could be >, >=, <, <=
**status** - this will be the HTML error status code \
**compareName** - name of the **compare** object
## Feedback

If you have any feedback, please reach out to to joshcsan@gmail.com


## License

[MIT](https://choosealicense.com/licenses/mit/)

