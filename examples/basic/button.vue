<template>
  <h2>Buttons</h2>
  <div class="card">
    <h3>Options</h3>
    <d-button>Default</d-button>
    <d-button type="primary">Primary</d-button>
    <d-button type="success">Success</d-button>
    <d-button type="danger">Danger</d-button>
    <d-button type="warning">Warning</d-button>
    <d-button type="info">Info Button</d-button>
    <d-button type="ghost">Ghost Button</d-button>
  </div>

  <div class="card">
    <h3>Sizes</h3>
    <d-button type= "primary" size ="large">Large Button</d-button>
    <d-button type= "primary" size = "small">Small Button</d-button>
  </div>

  <div class="card">
    <d-button type="primary" icon="fa-home">Home</d-button>
    <d-button type="primary" icon="fa-book">Library</d-button>
    <d-button type="primary" icon="fa-pencil">Applications</d-button>
    <d-button type="primary" icon="fa-cog">Settings</d-button>
  </div>

  <div class="card">
    <d-button type="primary" size="large" icon="fa-home">Large Button</d-button>
    <d-button type="primary" icon="fa-home">Medium Button (default)</d-button>
    <d-button type="primary" size="small" icon="fa-home">Small Button</d-button>
  </div>

  <div class="card">
    <d-button type="primary">Primary Button</d-button>
    <d-button type="primary" disabled>Primary Button (disabled)</d-button>
    <d-button>Secondary Button</d-button>
    <d-button disabled>Secondary Button (disabled)</d-button>
    <d-button type="phantom">Phantom Button</d-button>
    <d-button type="phantom" disabled>Phantom Button (disabled)</d-button>
  </div>

  <div class="card">
    <d-button-group>
      <d-button type="primary">确定</d-button>
      <d-button type="primary">取消</d-button>
    </d-button-group>

    <d-button-group>
      <d-button>左</d-button>
      <d-button>中</d-button>
      <d-button>右</d-button>
    </d-button-group>

    <d-button-group>
      <d-button type="primary">左</d-button>
      <d-button>中</d-button>
      <d-button>中</d-button>
      <d-button type="phantom">右</d-button>
    </d-button-group>
  </div>

  <div class="card">
    <d-button-group>
      <d-button type="phantom">1</d-button>
      <d-button type="phantom">2</d-button>
      <d-button type="phantom">3</d-button>
      <d-button type="phantom">4</d-button>
      <d-button type="phantom">5</d-button>
      <d-button type="phantom">前进 ></d-button>
    </d-button-group>
  </div>

  <div class="card">
    <d-button-group size="large">
      <d-button type="phantom">大</d-button>
      <d-button type="phantom">大</d-button>
      <d-button type="phantom">大</d-button>
    </d-button-group>
    <d-button-group>
      <d-button type="phantom">默认</d-button>
      <d-button type="phantom">默认</d-button>
      <d-button type="phantom">默认</d-button>
    </d-button-group>
    <d-button-group size="small">
      <d-button type="phantom">小</d-button>
      <d-button type="phantom">小</d-button>
      <d-button type="phantom">小</d-button>
    </d-button-group>
  </div>
</template>

<style>
  div.card {
    margin-top: 20px;
    background-color: #fff;
    padding: 16px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {};
</script>