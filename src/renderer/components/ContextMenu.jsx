import React from 'react';
import PropTypes from 'prop-types';

import { ListGroup, ListGroupItem, Popover } from 'reactstrap';

const actions = [
  // 'Delete',
  'Download',
];

const ContextMenu = ({ target, toggle, ...handlers }) => target && (
  <Popover
    isOpen={!!target}
    placement="right-start"
    target={target}
    toggle={toggle}
  >
    <ListGroup>
      {
        actions.map(action => (
          <ListGroupItem
            action
            className="context-menu-item"
            key={action}
            onClick={handlers[`on${action}`]}
          >
            { action }
          </ListGroupItem>
        ))
      }
    </ListGroup>
  </Popover>
);

ContextMenu.propTypes = {
  target: PropTypes.instanceOf(Element),
  toggle: PropTypes.func.isRequired,
};

ContextMenu.defaultProps = {
  target: null,
};

export default ContextMenu;
