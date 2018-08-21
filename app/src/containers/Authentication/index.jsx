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

class Authentication extends Component {
  static propTypes = {
    auth: PropTypes.func.isRequired,
  }

  state = {}

  handleSubmit = (credentials) => {
    const { auth, stepNext } = this.props;
    let { type } = this.state;
    let { host } = credentials;

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

  hostValidate = () => {}

  render() {
    const { error, loading, stepPrev } = this.props;
    const { hostError } = this.state;

    const buttonProps = { color: 'primary', disabled: loading };

    return (
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <Card className="p-3">
            <Label>
              Select protocol:
            </Label>
            <DropdownField
              className="mb-3"
              dropdownToggleProps={buttonProps}
              items={TYPES}
              onSelect={this.handleTypeSelect}
            />
            <Form
              buttonProps={buttonProps}
              buttonText="Connect"
              disabled={loading}
              onSubmit={this.handleSubmit}
            >
              <Field
                disabled={loading}
                name="host"
                onBlur={this.handleHostBlur}
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
                { error && error.message }
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
