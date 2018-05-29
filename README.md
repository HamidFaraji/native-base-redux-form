# Native Base Redux Form

Wrapper to use native-base form elements(input, checkbox, radio, select) in redux-form.

## Installation:

Via npm:
```
npm install --save native-base-redux-form
```

Via yarn:

```
yarn add native-base-redux-form
```

## Usage:

```javascript
import React from 'react';
import { reduxForm } from 'redux-form';
import { Form } from 'native-base';
import InputField from 'native-base-redux-form';

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const items [{
    value: 'one',
    label: 'One 1',
    key: 1
  }, {
    value: 'two',
    label: 'Two 2',
    key: 2
  }, {
    value: 'three',
    label: 'Three 3',
    key: 3
  }];

  return (
    <Form>
      <InputField name="username" />
      <InputField name="password" secureTextEntry />

      <InputField name="married" type="checkbox" />

      <InputField name="sex" type="radio" value="male" />
      <InputField name="sex" type="radio" value="female" />
      <InputField name="sex" type="radio" value="other" />

      <InputField name="sex" type="select" items={items} />
    </Form>
  );
}

export default reduxForm({
  form: 'simple'
})(SimpleForm)
```

`InputField` Component render native-base components by `type` you pass to it.

## Known issues:
- Initial values cause error and problems
- Checkbox and Radio dos'nt have initial checked status

## Contributors:
- [Hamid Faraji](http://hamidfaraji.ir)