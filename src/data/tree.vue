<template>
  <div class="tree">
  </div>
</template>

<style>
  .tree {
    background-color: white;
    overflow: auto;
    cursor: default;
  }

  .tree-node {
    white-space: nowrap;
    line-height: 24px;
  }

  .tree-node .expand-icon {
    display: inline-block;
    cursor: pointer;
    width: 0;
    height: 0;
    vertical-align: top;
    margin-top: 5px;
    border: 5px solid transparent;

    border-right-width: 0;
    border-left-color: #333;
    border-left-width: 7px;
  }

  .tree-node .expand-icon:hover {
    border-left-color: #999;
  }

  .tree-node .expand-icon.expanded {
    border: 5px solid transparent;
    border-bottom-width: 0;
    border-top-color: #333;
    border-top-width: 7px;
    margin-top: 7px;
  }

  .tree-node .expand-icon.expanded:hover {
    border-top-color: #999;
  }

  .tree-node .expand-icon.leaf {
    border-color: transparent;
  }

  .tree-node .text {
    padding-left: 2px;
    font-size: 14px;
    vertical-align: top;
    line-height: 24px;
  }

  .tree-node .tree-node-content {
    padding: 2px 4px 0 4px;
  }

  .tree-node .tree-node-content > input {
    vertical-align: top;
    margin-top: 5px;
  }

  .tree-node.current > .tree-node-content {
    /*color: red;*/
  }

  .tree-node > .tree-node-children {
    background-color: transparent;
    padding-left: 16px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  const Tree = require('./tree');

  export default {
    ready() {
      var tree = new Tree();

      tree.loadFrom({
        name: 'a', label: 'aa',
        children: [{
          name: 'b', label: 'bb',
          children: [{
            name: 'b1', label: 'b1'
          }]
        }, {
          name: 'c', label: 'cc',
          children: [{
            name: 'c1', label: 'cc1'
          }, {
            name: 'c2', label: 'cc2'
          }]
        }]
      });

      tree.render(this.$el);
    }
  };
</script>
