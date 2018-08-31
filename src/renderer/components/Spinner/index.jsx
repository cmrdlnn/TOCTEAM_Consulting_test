import React from 'react';
import PropTypes from 'prop-types';

import { ScaleLoader } from 'halogenium';

import './styles.css';

const Spinner = ({ title }) => (
  <div className="spinner-wrapper">
    <ScaleLoader color="#007bff" />
    {
      title && (
        <h3 className="spinner-title">
          { title }
        </h3>
      )
    }
  </div>
);

Spinner.propTypes = {
  title: PropTypes.string,
};

Spinner.defaultProps = {
  title: null,
};

export default Spinner;
