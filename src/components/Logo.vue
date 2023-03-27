<script>
export default {
  
}
</script>

<template>
  <div class="logo">
    <div class="logo-box">White<br>Space</div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/scss/_mixin.scss';

  .logo {
    margin-top: 15px;
    margin-left: 15px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    &::after {
      content: '';
      width: 148px;
      height: 148px;
      position: absolute;
      left: -15px;
      top: -15px;
      background:repeating-linear-gradient(45deg, 
      #fff 0, #fff 2%, transparent 0%, transparent 4.5%);
    }
    &:hover {
      .logo-box {
        background-color: darken(#bfbfbf, 2%);
        text-shadow: 0px 2px 5px #ffffffb9;
      }
    }
    @include rwdmax(767) {
      &::after {
        width: 110px;
        height: 110px;
      }
    }
  }
  .logo-box {
    width: 148px;
    height: 148px;
    color: #fff;
    border: solid 2px #fff;
    background-color: #bfbfbf;
    font-size: 30px;
    letter-spacing: 3.2px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    transition: .3s ease-in-out;
    @include rwdmax(767) {
      width: 110px;
      height: 110px;
      font-size: 22px;
      line-height: 1.3;
    }
  }
  
</style>