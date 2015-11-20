<template>
  <button class="btn" :class="{'btn-default': type === 'default', 'btn-primary': type === 'primary', 'btn-danger': type === 'danger', 'btn-success': type === 'success', 'btn-warning': type === 'warning', 'btn-info': type === 'info', 'btn-ghost': type === 'ghost', 'btn-lg': size === 'large', 'btn-sm': size === 'small', 'disabled': disabled}">
    <slot></slot>
  </button>
</template>

<style>
  .btn {
    outline: none;
    display: inline-block;
    text-align: center;
    padding: 11px 22px;
    border-radius: 2px;
    border: none;
    background-color: #d0dbe6;
    font-size: 14px;
    font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
    color: #6f7e95;
    text-decoration: none;
    line-height: 1.5;
    vertical-align: middle;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .24), 0 1px 3px rgba(0, 0, 0, .12);
  }

  .btn:hover {
    opacity: 0.6;
  }

  .btn-default {
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, .5);
  }

  .btn-primary {
    background-color: #2196F3;
    color: #fff;
  }

  .btn-success {
    background-color: #4AAA4A;
    color: #fff;
  }

  .btn-warning {
    background-color: #F37B1D;
    color: #fff;
  }

  .btn-danger {
    background-color: #F44336;
    color: #fff;
  }

  .btn-info {
    background-color: #3BB4F2;
    color: #fff;
  }

  .btn-ghost {
    background-color: none;
    border-color: #ccc;
    color: #333;
  }

  .btn.btn-ghost:hover {
    background-color: #fff;
    color: #0089dc;
    border-color: #0089dc;
  }

  .btn-lg {
    font-size: 14px;
    padding: 4px 15px;
  }

  .btn-sm {
    padding: 2px 6px;
  }

  .btn.disabled,
  .btn.disabled:hover {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.26);
    background-color: rgba(0, 0, 0, .12);
  }

  .btn .fa {
    color: #fff;
    margin-right: 2px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: ''
      }
    },
    ready() {
      if (this.icon !== '' && (this.icon.indexOf('fa-') > -1)) {
        var span = document.createElement('span');
        span.className = this.icon + ' fa';
        if (this.size !== 'small') {
          span.className += ' fa-lg';
        }
        this.$el.insertBefore(span, this.$el.childNodes[0]);
      }
    }
  }
</script>