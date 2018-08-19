import React from 'react';
import PropTypes from 'prop-types';
import {
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';

const Field = ({
  addon,
  addonProps,
  feedback,
  feedbackProps,
  formGroupProps,
  helper,
  name,
  title,
  ...inputProps
}) => (
  <FormGroup {...formGroupProps}>
    { title && <Label for={name}>{ title }</Label> }
    <InputGroup>
      { addon && (
        <InputGroupAddon addonType="prepend" {...addonProps}>
          <InputGroupText>
            { addon }
          </InputGroupText>
        </InputGroupAddon>
      )}
      <Input id={name} name={name} {...inputProps} />
      { feedback && <FormFeedback {...feedbackProps}>{ feedback }</FormFeedback> }
    </InputGroup>
    { helper && <FormText>{ helper }</FormText> }
  </FormGroup>
);

Field.defaultProps = {
  addon: null,
  addonProps: null,
  feedbackProps: null,
  formGroupProps: null,
  helper: null,
  name: null,
  title: null,
};

Field.propTypes = {
  addonProps: PropTypes.objectOf(PropTypes.any),
  addon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  feedbackProps: PropTypes.objectOf(PropTypes.any),
  formGroupProps: PropTypes.objectOf(PropTypes.any),
  helper: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
};

export default Field;
