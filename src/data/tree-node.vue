<template>
  <div class="tree-node">
    <span class="tree-node-content">
      <span class="expand-icon" @click="handleExpandIconClick"></span><input type="checkbox" /><span class="text">{{ label }}</span>
    </span>

    <div class="tree-node-children" v-if="childrenRendered">
      <d-tree-node v-for="child in childrenData"></d-tree-node>
    </div>
  </div>
</template>

<style>
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
  export default {
    name: 'd-tree-node',
    props: {
      label: {},
      checked: {
        type: Boolean,
        default: false
      },
      childrenData: {
        type: Array
      }
    },

    methods: {
      handleExpandIconClick() {
        this.childrenRendered = true;
      }
    },

    ready() {
      console.log(this.childrenData);
    },

    data() {
      return {
        level: 0,
        leaf: false,
        children: [],
        levelConfig: null,
        $tree: null,
        $item: null,
        childrenRendered: false
      }
    }
  }
</script>