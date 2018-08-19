import React, { Component } from 'react';

import Tree, { TreeNode } from 'rc-tree';

import 'rc-tree/assets/index.css';

class Viewer extends Component {
  render() {
    return (
      <Tree
        checkable
        defaultExpandAll
        showLine
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="leaf" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" />
            <TreeNode title="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title="parent 1-1-0" key="0-0-1-0" disableCheckbox />
            <TreeNode title="parent 1-1-1" key="0-0-1-1" />
          </TreeNode>
          <TreeNode title="parent 1-2" key="0-0-2" disabled>
            <TreeNode title="parent 1-2-0" key="0-0-2-0" disabled />
            <TreeNode title="parent 1-2-1" key="0-0-2-1" />
          </TreeNode>
          <TreeNode title="parent 1-3" key="0-0-3">
            <TreeNode title="parent 1-3-0" key="0-0-3-0" />
            <TreeNode title="parent 1-3-1" key="0-0-3-1" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}

export default Viewer;
