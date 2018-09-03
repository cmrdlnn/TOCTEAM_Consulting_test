import React, { Component, Fragment } from 'react';
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
} from 'reactstrap';

import { download, ls, mv, rm } from 'modules/viewer';

import 'rc-tree/assets/index.css';

import ContextMenu from 'components/ContextMenu';
import Spinner from 'components/Spinner';
import Toaster from '../Toaster';

import './styles.css';

const renderNodes = nodes => (
  nodes.map(({ children, isLeaf, key, name }) => (
    <TreeNode
      isLeaf={isLeaf}
      key={key}
      title={name}
    >
      { children && renderNodes(children) }
    </TreeNode>
  ))
);

class Viewer extends Component {
  static propTypes = {
    executeDownload: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    executeLs: PropTypes.func.isRequired,
    executeMv: PropTypes.func.isRequired,
    executeRm: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
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
    const loadPromise = executeLs(eventKey);

    this.setState({ loadPromise });

    return loadPromise;
  }

  handleDrop = ({
    dragNode: { props: { eventKey: dragKey } },
    dropToGap,
    node: { props: { eventKey: dropKey, isLeaf } },
  }) => {
    const { executeMv } = this.props;
    const { loadPromise } = this.state;

    (loadPromise || Promise.resolve()).then(() => {
      executeMv(dragKey, dropKey, dropToGap, isLeaf);
    });
  }

  handleDelete = () => {
    this.contextMenuAction('Rm');
  }

  handleDownload = ({ target: { files } }) => {
    this.contextMenuAction('Download', files[0].path);
  }

  handleDownloadButtonClick = () => {
    this.folderViewer.click();
  }

  contextMenuAction = (actionName, ...args) => {
    const { [`execute${actionName}`]: action } = this.props;
    const { eventKey } = this.state;

    action(eventKey, ...args);
    this.toggle();
  }

  handleNodeRightClick = ({ node: { selectHandle, props: { eventKey } } }) => {
    this.toggle(() => {
      this.setState({ eventKey, contextMenuTarget: selectHandle });
    });
  }

  toggle = (callback) => {
    this.setState(
      { contextMenuTarget: null },
      typeof callback === 'function' ? callback : null,
    );
  }

  render() {
    const { list } = this.props;

    if (!list) return <Spinner />;

    const { url, stepPrev } = this.props;
    const { contextMenuTarget } = this.state;

    return (
      <Fragment>
        <Card>
          <CardHeader>
            <h5 className="mt-2">{ url }</h5>
            <ButtonGroup className="mb-2">
              <Button color="primary" onClick={stepPrev}>
                Close connection
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
                  onDragStart={this.onDragStart}
                  onDragEnter={this.onDragEnter}
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
          <ContextMenu
            onDelete={this.handleDelete}
            onDownload={this.handleDownloadButtonClick}
            toggle={this.toggle}
            target={contextMenuTarget}
          />
        </Card>
        <Toaster />
        <input
          directory=""
          onChange={this.handleDownload}
          ref={(ref) => { this.folderViewer = ref; }}
          style={{ display: 'none' }}
          type="file"
          webkitdirectory=""
        />
      </Fragment>
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
  executeMv: bindActionCreators(mv, dispatch),
  executeRm: bindActionCreators(rm, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
