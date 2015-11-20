var Tree = function(options) {
  this.rootNode = new TreeNode('$root', {
    label: '$root',
    tree: this
  });
  this.allNodes = { $root: this.rootNode };
  this.currentNode = null;
  this.el = null;

  for (var option in options) {
    if (options.hasOwnProperty(option)) {
      this[option] = options[option];
    }
  }
};

Tree.prototype.addNode = function (id, label, parentId) {
  if (id && label && parentId) {
    var node = new TreeNode(id, {
      label: label,
      tree: this
    });
    var parentNode = this.allNodes[parentId];
    parentNode.addChild(node);

    this.allNodes[id] = node;

    return node;
  }
};

Tree.prototype.getNodeById = function(id) {
  return this.allNodes[id];
};

Tree.prototype.detachNode = function(node) {
  if (node) {
    this.allNodes[node.id] = null;
    delete this.allNodes[node.id];
  }
};

Tree.prototype.loadFrom = function(object) {
  var tree = this;
  var addTreeNode = function (object, parent) {
    var name = object.name;
    var label = object.label;

    var node = tree.addNode(name, label, parent.id);

    var children = object.children || [];

    for (var i = 0, j = children.length; i < j; i++) {
      var child = children[i];
      addTreeNode(child, node);
    }
  };

  addTreeNode(object, tree.rootNode);
};

var createWithLevelConfig = function(tree, object, levelConfig, parentNode) {
  var idProperty = levelConfig.id || 'id';
  var labelProperty = levelConfig.label || 'name';
  var childrenProperty = levelConfig.childrenProperty;

  var id = object[idProperty];
  var label = object[labelProperty];

  if (id === undefined) {
    throw new Error('id is required.');
  }

  var result = new TreeNode(id, {
    label: label,
    tree: tree,
    levelConfig: levelConfig,
    data: object
  });

  parentNode.addChild(result);

  if (childrenProperty) {
    var childrenLevelConfig = levelConfig.children;
    var children = object[childrenProperty];
    if (children && childrenLevelConfig) {
      for (var i = 0, j = children.length; i < j; i++) {
        var child = children[i];
        createWithLevelConfig(tree, child, childrenLevelConfig, result);
      }
    }
  }

  return result;
};

Tree.prototype.setNodeChildren = function(node, children) {
  var tree = this;
  var levelConfig = node.levelConfig;
  var childLevelConfig = levelConfig.children;

  node.clearChildren();

  for (var i = 0, j = children.length; i < j; i++) {
    var item = children[i];
    createWithLevelConfig(tree, item, childLevelConfig, node);
  }
};

Tree.prototype.getCheckedNodes = function(leaf) {
  var allNodes = this.allNodes;
  var result = [];
  for (var id in allNodes) {
    if (allNodes.hasOwnProperty(id)) {
      var node = allNodes[id];
      if (leaf === true) {
        if (node.checked && node.isLeaf()) {
          result.push(node);
        }
      } else {
        result.push(node);
      }
    }
  }
  return result;
};

Tree.prototype.load = function(array) {
  if (!(array instanceof Array)) {
    array = [array];
  }

  var levelConfig = this.levelConfig;
  var rootNode = this.rootNode;

  for (var i = 0, j = array.length; i < j; i++) {
    var item = array[i];
    createWithLevelConfig(this, item, levelConfig, rootNode);
  }
};

Tree.prototype.render = function (element) {
  var self = this;
  function buildDiv(pNodeDiv, node, tree) {
    var children = node.children;
    for (var i = 0, j = children.length; i < j; i++) {
      var child = children[i];
      var nodeDiv = child.render();
      pNodeDiv.appendChild(nodeDiv);
      child.tree = self;

      buildDiv(child.refs.children, children[i], tree);
    }
  }

  var treeEl;
  if (element) {
    treeEl = element;
  } else {
    treeEl = document.createElement('div');
    treeEl.className = 'tree';
  }

  treeEl.className = 'tree';
  buildDiv(treeEl, this.rootNode, treeEl);

  this.el = treeEl;

  return treeEl;
};

var TreeNode = function (id, options) {
  this.id = id;
  this.level = 0;
  this.checked = false;

  this.children = [];

  this.refs = {};
  if (typeof options !== 'string') {
    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        this[prop] = options[prop];
      }
    }
  } else {
    this.label = options;
  }

  var levelConfig = this.levelConfig;
  if (levelConfig) {
    var children = levelConfig.children;
    if (children && children.lazy) {
      this.lazyChildren = true;
      this.loadFn = children.load;
    }
  }
};

TreeNode.prototype.clearChildren = function() {
  var children = this.children || [];
  for (var i = 0, j = children.length; i < j; i++) {
    var child = children[i];
    child.destroy();
  }

  this.children = [];
  var refs = this.refs;
  if (refs && refs.children) {
    refs.children.innerHTML = '';
  }
};

TreeNode.prototype.loadIfNeeded = function(callback) {
  var node = this;
  if (node.lazyChildren === true) {
    if (!node.childrenLoaded && node.loadFn) {
      node.childrenLoaded = 'loading';
      node.loadFn.call(node, function() {
        node.childrenLoaded = true;
        node.refreshExpand();
        if (callback) {
          callback.call(node);
        }
      });
      return true;
    }
  }
};

TreeNode.prototype.isLeaf = function() {
  var children = this.children || [];
  if (!this.lazyChildren || (this.lazyChildren === true && this.childrenLoaded === true)) {
    return children.length === 0;
  }
  return false;
};

TreeNode.prototype.setChecked = function(value, deep) {
  var callback = function() {
    var children = this.children || [];
    for (var i = 0, j = children.length; i < j; i++) {
      var child = children[i];
      child.setChecked(value);
    }
  };

  this.loadIfNeeded(callback);

  var input = this.refs.input;
  if (value === 'half') {
    input.indeterminate = true;
    input.checked = false;
  } else {
    input.indeterminate = false;
    input.checked = !!value;
  }

  this.checked = value;
  var i, j;

  if (deep) {
    var children = this.children;
    for (i = 0, j = children.length; i < j; i++) {
      var child = children[i];
      child.setChecked(value, deep);
    }
  }

  if (this.parent.id === '$root') return;

  var siblings = this.parent.children;

  var all = true;
  var none = true;
  for (i = 0, j = siblings.length; i < j; i++) {
    var sibling = siblings[i];
    if (sibling.checked !== true) {
      all = false;
    }
    if (sibling.checked !== false) {
      none = false;
    }
  }

  if (all) {
    this.parent.setChecked(true);
  } else if (!all && !none) {
    this.parent.setChecked('half');
  } else if (none) {
    this.parent.setChecked(false);
  }
};

TreeNode.prototype.doOnCheckboxChange = function(value) {
  var i, j;

  this.setChecked(value);

  //sync children checked state
  var children = this.children;
  for (i = 0, j = children.length; i < j; i++) {
    var child = children[i];
    child.setChecked(value, true);
  }
};

TreeNode.prototype.setChildrenData = function(data) {
  if (this.levelConfig && this.tree) {
    this.tree.setNodeChildren(this, data);
  }
};

TreeNode.prototype.addChild = function(child) {
  child.parent = this;
  child.level = this.level + 1;
  this.children.push(child);

  var refs = this.refs;
  if (refs && refs.children) {
    var childEl = child.render();
    refs.children.appendChild(childEl);
  }

  this.tree.allNodes[child.id] = child;
};

TreeNode.prototype.destroy = function() {
  var children = this.children || [];
  for (var i = 0, j = children.length; i < j; i++) {
    var child = children[i];
    child.tree.detachNode(child);
  }
  this.tree.detachNode(this);
};

TreeNode.prototype.refreshExpand = function() {
  var refs = this.refs;

  if (refs) {
    var expandIcon = refs.expandIcon;
    var children = this.children || [];

    if (children) {
      var hasChild;
      if (this.lazyChildren === true) {
        if (this.childrenLoaded) {
          hasChild = children.length > 0;
        } else {
          hasChild = true;
        }
      } else {
        hasChild = children.length > 0;
      }

      if (hasChild) {
        expandIcon.classList.remove('leaf');
      } else {
        expandIcon.classList.add('leaf');
      }
    }
  }
};

TreeNode.prototype.render = function() {
  var node = this;
  var refs = this.refs;

  var el = document.createElement('div');
  el.className = 'tree-node';

  var expandIcon = document.createElement('span');

  if (!this.lazyChildren && node.children.length === 0) {
    expandIcon.className = 'expand-icon leaf';
  } else {
    expandIcon.className = 'expand-icon';
    expandIcon.onclick = function (event) {
      event.stopPropagation();
      node.loadIfNeeded();

      if (refs.children.style.display == 'none') {
        refs.children.style.display = 'block';
        expandIcon.classList.add('expanded');
      } else {
        refs.children.style.display = 'none';
        expandIcon.classList.remove('expanded');
      }
    };
  }

  var text = document.createElement('span');
  text.className = 'text';
  text.innerHTML = node.label;

  var content = document.createElement('span');
  content.className = 'tree-node-content';

  var input = document.createElement('input');
  input.type = 'checkbox';
  input.onchange = function() {
    node.doOnCheckboxChange(this.checked);
  };

  content.appendChild(expandIcon);
  content.appendChild(input);
  content.appendChild(text);

  refs.expandIcon = expandIcon;
  refs.text = text;
  refs.input = input;
  refs.content = content;

  content.onclick = function (event) {
    event.stopPropagation();

    if (node.tree.currentNode) {
      node.tree.currentNode.el.className = 'tree-node';
    }

    el.className = 'tree-node current';

    node.tree.currentNode = node;
  };

  el.appendChild(content);

  var childrenEl = document.createElement('div');
  childrenEl.style.display = 'none';
  childrenEl.className = 'tree-node-children';
  refs.children = childrenEl;

  el.appendChild(childrenEl);

  this.el = el;

  return el;
};

export default Tree;