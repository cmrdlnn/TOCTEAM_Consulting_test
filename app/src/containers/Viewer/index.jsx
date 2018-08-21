import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tree, { TreeNode } from 'rc-tree';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Popover,
} from 'reactstrap';

import { download, ls } from 'modules/viewer';

import 'rc-tree/assets/index.css';

import Spinner from 'components/Spinner';

import './styles.css';

const renderNodes = nodes => (
  nodes.map(({ children, isLeaf, key, name }) => (
    <TreeNode
      isLeaf={isLeaf}
      key={key}
      title={name}
    >
      { children && renderNodes(children)}
    </TreeNode>
  ))
);

class Viewer extends Component {
  static propTypes = {
    executeDownload: PropTypes.func.isRequired,
    executeLs: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.any),
    stepPrev: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  }

  static defaultProps = {
    list: null,
  }

  state = {}

  componentDidMount() {
    const { executeLs } = this.props;

    executeLs();
  }

  handleLoadData = ({ props: { eventKey } }) => {
    const { executeLs } = this.props;

    return executeLs(eventKey);
  }

  handleDrop = (q) => {
    console.log(q)
  }

  handleDownloadClick = () => {
    const { executeDownload } = this.props;
    const { eventKey } = this.state;

    executeDownload(eventKey);
    this.toggle();
  }

  handleNodeRightClick = ({ node: { selectHandle, props: { eventKey } } }) => {
    this.toggle(() => {
      this.setState({ eventKey, popoverProps: { isOpen: true, target: selectHandle } });
    });
  }

  toggle = (_, callback) => {
    this.setState(
      { eventKey: null, popoverProps: null },
      typeof callback === 'function' ? callback : null,
    );
  }

  render() {
    const { list } = this.props;

    if (!list) return <Spinner />;

    const { url, stepPrev } = this.props;
    const { popoverProps } = this.state;

    return (
      <Card>
        <CardHeader>
          <h5 className="mt-2">{ url }</h5>
          <ButtonGroup className="mb-2">
            <Button color="primary" onClick={stepPrev}>
              Close connection
            </Button>
            <Button color="danger">
              Delete
            </Button>
          </ButtonGroup>
        </CardHeader>
        <CardBody>
          {
            list.length ? (
              <Tree
                checkable
                draggable
                loadData={this.handleLoadData}
                onDrop={this.handleDrop}
                onRightClick={this.handleNodeRightClick}
                selectable={false}
                showLine
              >
                { renderNodes(list) }
              </Tree>
            ) : (
              <h5 className="mt-2">Directory is empty</h5>
            )
          }
        </CardBody>
        { popoverProps && (
          <Popover placement="right-start" toggle={this.toggle} {...popoverProps}>
            <ListGroup>
              <ListGroupItem
                action
                className="context-menu-item"
                onClick={this.handleDownloadClick}
              >
                Download
              </ListGroupItem>
            </ListGroup>
          </Popover>
        )}
      </Card>
    );
  }
}

const mapStateToProps = ({ authentication: { url }, viewer }) => ({
  url,
  ...viewer,
});

const mapDispatchToProps = dispatch => ({
  executeDownload: bindActionCreators(download, dispatch),
  executeLs: bindActionCreators(ls, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
