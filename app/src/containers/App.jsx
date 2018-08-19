import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { nextStep, prevStep } from 'modules/step';

import 'bootstrap/dist/css/bootstrap.min.css';

import Authentication from './Authentication';
import Viewer from './Viewer';

const STEPS = [
  Authentication,
  Viewer,
];

const App = ({ step, stepNext, stepPrev }) => (
  React.createElement(STEPS[step], { stepNext, stepPrev })
);

App.propTypes = {
  step: PropTypes.number.isRequired,
  stepNext: PropTypes.func.isRequired,
  stepPrev: PropTypes.func.isRequired,
};

const mapStateToProps = ({ step }) => ({ step });

const mapDispatchToProps = dispatch => ({
  stepNext: bindActionCreators(nextStep, dispatch),
  stepPrev: bindActionCreators(prevStep, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
