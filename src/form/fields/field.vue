<template>
  <div class='d-field' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ label || '' }}</label>
    <div>
      <slot></slot>
      <div class="d-field-hint">
        <i class='d-icon' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-field {
    position: relative;
    display: table !important;
    width: 300px;
    min-height: 44px;
  }

  .d-field.required > label::before {
    content: '*';
    color: #ff0000;
    margin-right: 2px;
  }

  .d-field::after {
    content: "";
    display: table;
    clear: both;
  }

  .d-field > label {
    display: table-cell;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 120px;
    height: 30px;
    font-size: 14px;
    margin-right: 10px;
    line-height: 30px;
    text-align: right;
    color: #666;
  }

  .d-field > div {
    display: table-cell;
    width: 100%;
    vertical-align: top;
  }

  .d-field.validate-error input {
    border-color: #ff464c;
  }

  .d-field.validate-error .d-field-hint {
    color: #ff464c;
  }

  .d-field-hint {
    font-size: 12px;
    line-height: 16px;
    height: 16px;
  }

  .d-field-hint .icon-formfield-error {
    font-size: 14px;
    line-height: 14px;
    color: #ff464c;
  }

  .d-field-hint .icon-formfield-error:before {
    margin-right: 3px;
    vertical-align: middle;
  }

  .d-field-hint .icon-formfield-warning:before {
    line-height: 14px;
    font-size: 14px;
    color: #65c04b;
    margin-right: 3px;
    vertical-align: middle;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var merge = require('../../util').merge;
  var common = require('./field-common');

  export default {
    props: {
      label: {
        type: String
      },

      hideLabel: {
        type: Boolean,
        default: false
      },

      labelWidth: {},

      hintType: {
        type: String,
        default: ''
      },

      required: {
        type: Boolean,
        default: null
      },

      hintMessage: {
        type: String
      }
    },

    created: common.onCreated,

    compiled: common.onCompiled,

    computed: merge({}, common.computed)
  };
</script>