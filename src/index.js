require('./icon/iconfont.css');
require('./css/font-awesome.css');
require('./grid.css');

import Vue from './config';

import Alert from './basic/alert.vue'
import Panel from './basic/panel.vue'
import Dialog from './basic/dialog.vue'
import Button from './basic/button.vue'
import ButtonGroup from './basic/button-group.vue'
import ProgressBar from './basic/progress-bar.vue'
import Slider from './basic/slider.vue'
import Sticky from './basic/sticky.vue'
import DropdownButton from './basic/dropdown.vue'
import DropdownItem from './basic/dropdown-item.vue'
import DropdownDivider from './basic/dropdown-divider.vue'
import Vbox from './basic/vbox.vue'

import Accordion from './nav/accordion.vue'
import AccordionPanel from './nav/accordion-panel.vue'
import Tab from './nav/tab.vue'
import Tabs from './nav/tabs.vue'

import Grid from './data/grid.vue'
import Tree from './data/tree.vue'
import TreeNode from './data/tree-node.vue'

import Pagination from './data/pagination.vue'

import Form from './form/form.vue'
import Radio from './form/radio.vue'
import TextEditor from './form/text-editor.vue'
import RadioGroup from './form/radio-group.vue'
import DatePicker from './form/date-picker.vue'
import Checkbox from './form/checkbox.vue'
import Select from './form/select.vue'
import Option from './form/select-option.vue'
import Field from './form/fields/field.vue'
import TextField from './form/fields/text.vue'
import CheckboxField from './form/fields/check.vue'
import SelectField from './form/fields/select.vue'
import RadiogroupField from './form/fields/radio.vue'

export var Components = {
  Alert,
  Panel,
  Dialog,
  Button,
  ButtonGroup,
  ProgressBar,
  Slider,
  Sticky,
  DropdownButton,
  DropdownItem,
  DropdownDivider,
  Vbox,

  Accordion,
  AccordionPanel,
  Tab,
  Tabs,

  Grid,
  Tree,
  TreeNode,

  Pagination,

  Form,
  Field,
  TextField,
  CheckboxField,
  SelectField,
  RadiogroupField,
  Radio,
  RadioGroup,
  TextEditor,
  Checkbox,
  DatePicker,
  Select,
  Option
};

export var initComponents = (Vue, prefix, components) => {
  if (arguments.length < 3) {
    components = prefix;
    prefix = 'D';
  } else {
    if (!prefix) {
      prefix = 'D';
    }
  }

  if (!components) components = Object.keys(Components);

  if (components instanceof Array) {
    for (var i = 0, j = components.length; i < j; i++) {
      var key = components[i];
      Vue.component(prefix + key, Components[key]);
    }
  }
};

require('./service/tooltip');

export { default as MessageBox } from './service/msgbox'

export { default as Notification } from './service/notification'

export { default as Schema } from './schema/index'

export { default as LoadingMask } from './service/loading-mask'
