import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert, AlertContainer } from 'react-bs-notifier';

const Toaster = ({ notifications }) => (
  <AlertContainer>
    {
      Object.values(notifications).map(({ message, type }) => (
        <Alert type={type} showIcon>
          { message }
        </Alert>
      ))
    }
  </AlertContainer>
);

Toaster.propTypes = {
  notifications: PropTypes.objectOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = ({ notifications }) => ({ notifications });

export default connect(mapStateToProps)(Toaster);
