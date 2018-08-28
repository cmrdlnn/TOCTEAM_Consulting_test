import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownField extends React.Component {
  constructor(props) {
    super(props);

    const { items } = props;

    this.state = {
      dropdownIsOpen: false,
      selectedItem: Object.keys(items)[0],
    };
  }

  componentWillMount() {
    const { items } = this.props;

    this.findAndSelectItem(items);
  }

  componentWillReceiveProps(nextProps) {
    const { items } = this.props;
    const { items: nextItems } = nextProps;

    if (
      items.length !== nextItems.length || JSON.stringify(items) !== JSON.stringify(nextItems)
    ) {
      this.findAndSelectItem(nextItems);
    }
  }

  selectItem = (itemKey, item) => {
    const { items, onSelect } = this.props;

    this.setState({ selectedItem: itemKey });

    if (onSelect) onSelect(item || items[itemKey]);
  }

  toggle = () => {
    const { dropdownIsOpen } = this.state;

    this.setState({ dropdownIsOpen: !dropdownIsOpen });
  }

  findAndSelectItem = (items) => {
    const itemKey = Object.keys(items).find(key => (
      typeof items[key] !== 'object'
      || !['disabled', 'divider', 'header'].some(prop => items[key][prop])
    ));

    this.selectItem(itemKey, items[itemKey]);
  }

  render() {
    const { dropdownToggleProps, items, onSelect, ...other } = this.props;
    const { dropdownIsOpen, selectedItem } = this.state;
    const itemsKeys = Object.keys(items);

    return (
      <Dropdown
        isOpen={dropdownIsOpen}
        toggle={this.toggle}
        {...other}
      >
        <div className={dropdownIsOpen ? 'dropup' : ''}>
          <DropdownToggle caret {...dropdownToggleProps}>
            {
              typeof items[selectedItem] === 'object'
                ? items[selectedItem].title
                : items[selectedItem]
            }
          </DropdownToggle>
        </div>
        <DropdownMenu>
          {
            Object.values(items).map((item, index) => {
              const itemProps = {};
              let title = '';

              if (typeof item === 'object') {
                if (item.divider) return <DropdownItem divider key={index} />;

                ({ title } = item);

                if (
                  !Object.keys(item).some((prop) => {
                    if (['disabled', 'header'].includes(prop)) {
                      itemProps[prop] = item[prop];
                      return true;
                    }

                    return false;
                  })
                ) {
                  itemProps.onClick = () => this.selectItem(itemsKeys[index]);
                }
              } else {
                title = item;
                itemProps.onClick = () => this.selectItem(itemsKeys[index]);
              }

              return (
                <DropdownItem key={index} {...itemProps}>
                  { title }
                </DropdownItem>
              );
            })
          }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

DropdownField.defaultProps = {
  dropdownToggleProps: null,
  items: [],
  onSelect: null,
};

DropdownField.propTypes = {
  dropdownToggleProps: PropTypes.objectOf(PropTypes.any),
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          disabled: PropTypes.bool,
          divider: PropTypes.bool,
          header: PropTypes.bool,
          title: PropTypes.string,
        }),
        PropTypes.string,
      ]),
    ),
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          disabled: PropTypes.bool,
          divider: PropTypes.bool,
          header: PropTypes.bool,
          title: PropTypes.string,
        }),
        PropTypes.string,
      ]),
    ),
  ]),
  onSelect: PropTypes.func,
};

export default DropdownField;
