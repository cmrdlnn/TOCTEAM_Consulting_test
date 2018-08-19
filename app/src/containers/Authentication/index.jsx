import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, Container, Label, Row } from 'reactstrap';

import DropdownField from 'components/DropdownField';
import Field from 'components/Field';
import Form from 'components/Form';

import { authenticate } from 'modules/authentication';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    const { auth } = this.props;
    const { type } = this.state;

    const portMatch = credentials.host.match(/^(.+):(\d+)$/);
    let args = { ...credentials, type };

    if (portMatch) {
      const [, host, port] = portMatch;

      args = { ...args, host, port };
    }

    auth(args);
  }

  handleTypeSelect = (type) => {
    this.setState({ type });
  }

  hostValidate = () => {}

  render() {
    const { hostError } = this.state;

    return (
      <Container className="mt-3">
        <Row>
          <Card className="mx-auto p-3">
            <Label>
              Select protocol:
            </Label>
            <DropdownField
              className="mb-3"
              items={TYPES}
              onSelect={this.handleTypeSelect}
            />
            <Form buttonText="Connect" onSubmit={this.handleSubmit}>
              <Field
                name="host"
                onBlur={this.handleHostBlur}
                title="Address of server:"
                {...hostError}
              />
              <Field
                name="username"
                title="Username:"
              />
              <Field
                name="password"
                title="Password:"
                type="password"
              />
            </Form>
          </Card>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ authentication }) => authentication;

const mapDispatchToProps = dispatch => ({
  auth: bindActionCreators(authenticate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
