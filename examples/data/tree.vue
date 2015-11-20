<template>
  <d-tree></d-tree>
  <div>
    <d-tree-node label="test" :children-data="children"></d-tree-node>
    <d-tree-node label="test"></d-tree-node>
    <d-tree-node label="test"></d-tree-node>
    <d-tree-node label="test"></d-tree-node>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {

    data() {
      return {
        children: [{
          label: 'test'
        }, {
          label: 'test2'
        }]
      }
    }

  };
</script>