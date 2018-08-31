import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Alert, Card, Col, Label, Row } from 'reactstrap';

import DropdownField from 'components/DropdownField';
import Field from 'components/Field';
import Form from 'components/Form';

import { authenticate } from 'modules/authentication';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const TYPES = [
  'FTP',
  'SFTP',
];

const hostIsEmpty = {
  feedback: 'This field is required',
  invalid: true,
};

class Authentication extends Component {
  static propTypes = {
    auth: PropTypes.func.isRequired,
  }

  state = {}

  componentDidMount() {
    this.host.focus();
  }

  handleSubmit = (credentials) => {
    let { host } = credentials;

    const { auth, stepNext } = this.props;
    let { type } = this.state;

    type = type.toLowerCase();
    [,, host] = host.match(new RegExp(`(${type}:\/\/)?(.+?)\/?$`));
    const portMatch = host.match(/^(.+):(\d+)$/i);
    let args = { ...credentials, host, type };

    if (portMatch) {
      const [, matchedHost, port] = portMatch;

      args = { ...args, host: matchedHost, port };
    }

    auth(args).then(stepNext);
  }

  handleTypeSelect = (type) => {
    this.setState({ type });
  }

  hostValidate = () => {
    const isValid = this.host.value.trim() !== '';

    this.setState({ hostError: isValid ? null : hostIsEmpty });
    return isValid;
  }

  hostRef = (ref) => {
    this.host = ref;
  }

  render() {
    const { error, loading, stepPrev } = this.props;
    const { hostError } = this.state;

    return (
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <Card className="p-3">
            <Label>
              Select protocol:
            </Label>
            <DropdownField
              className="mb-3"
              dropdownToggleProps={{ color: 'primary', disabled: loading }}
              items={TYPES}
              onSelect={this.handleTypeSelect}
            />
            <Form
              buttonProps={{ color: 'primary', disabled: Boolean(hostError || loading) }}
              buttonText="Connect"
              disabled={loading}
              onSubmit={this.handleSubmit}
            >
              <Field
                disabled={loading}
                innerRef={this.hostRef}
                name="host"
                onBlur={this.hostValidate}
                onChange={this.hostValidate}
                title="Address of server:"
                {...hostError}
              />
              <Field
                disabled={loading}
                name="username"
                title="Username:"
              />
              <Field
                disabled={loading}
                name="password"
                title="Password:"
                type="password"
              />
              <Alert color="danger" isOpen={!!error} toggle={stepPrev}>
                { error }
              </Alert>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ authentication }) => authentication;

const mapDispatchToProps = dispatch => ({
  auth: bindActionCreators(authenticate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
