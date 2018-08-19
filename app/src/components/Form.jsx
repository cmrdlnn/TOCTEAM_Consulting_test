import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

class Form extends Component {
  handelSubmit = (e) => {
    e.preventDefault();

    const { onSubmit, withReset } = this.props;
    const { elements, reset } = e.target;
    const json = Array.from(elements).reduce((result, element) => {
      // eslint-disable-next-line no-param-reassign
      if (element.name) result[element.name] = element.value.trim();
      return result;
    }, {});

    if (withReset) reset();

    onSubmit(json);
  }

  render() {
    const {
      buttonProps,
      buttonText,
      children,
      onSubmit,
      withButton,
      withReset,
      ...formProps
    } = this.props;

    return (
      <form onSubmit={this.handelSubmit} {...formProps}>
        { children }
        { withButton && (
          <Button type="submit" {...buttonProps}>{buttonText}</Button>
        )}
      </form>
    );
  }
}

Form.defaultProps = {
  buttonText: null,
  withButton: true,
  withReset: false,
};

Form.propTypes = {
  buttonText: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  withButton: PropTypes.bool,
  withReset: PropTypes.bool,
};

export default Form;
