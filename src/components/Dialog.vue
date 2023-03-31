<script>
import { ref } from 'vue';

export default {
  props: {

  },
  setup() {

    return {
    }
  }
}
</script>

<template #default="{ togglePopover }">
  <div class="libox">
    <div class="libox-container">
      <div class="libox-wrap">
        <div class="content common-px">
          <h6 class="fz-24 font-bold">預約時段</h6>
          <div class="border">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <form action="">
            <div class="form-item">
              <label for="name" class="fz-14 font-bold">姓名</label>
              <input type="text" id="name">
            </div>
            <div class="form-item">
              <label for="phone" class="fz-14 font-bold">電話</label>
              <input type="text" id="phone" inputmode="tel">
            </div>
            <div class="form-item">
              <label for="date" class="fz-14 font-bold">預約起訖</label>
              <!-- <input type="text" id="date" @click="togglePopover"> -->
              <VDatePicker >
                <template #default="{ togglePopover }">
                  <input type="text" @click="togglePopover">
                </template>
              </VDatePicker>
            </div>
          </form>
        </div>
        <div class="detail common-px">
          <p class="fz-12">
            <span>平日時段</span>
            <span>1夜</span>
          </p>
          <p class="fz-12">
            <span>假日時段</span>
            <span>1夜</span>
          </p>
        </div>
        <div class="total common-px">= NT.28550</div>
        <div class="bottom common-px">
          <div class="btn btn-light">取消</div>
          <div class="btn btn-dark">確定預約</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .libox {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.6);
    opacity: 0;
    z-index: -10;
    transition: opacity .3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
      opacity: 1;
      z-index: 999;
    }
    &-container {
      max-width: 425px;
      width: 100%;
      margin: 0 auto;
      background-color: #fff;
    }
    &-wrap {
      padding: 35px 0;
    }
  }
  h6 {
    text-align: left;
  }
  form {
    margin-bottom: 20px;
  }
  .form-item {
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    label {
      width: 95px;
      display: block;
      text-align: left;
    }
    input {
      padding: 5px 10px;
      width: 100%;
      border-radius: 5px;
      border: solid 1px #c9c9c9;
      font-size: 14px;
    }
  }

  .detail {
    padding: 18px 0;
    background-color: #EDEDED;
    p {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
  .total {
    padding-top: 20px;
    padding-bottom: 35px;
    text-align: right;
    color: #FF5C5C;
    letter-spacing: 2.72px;
    font-weight: bold;
    font-size: 26px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
  }
  .btn {
    letter-spacing: 1.46px;
    font-size: 14px;
    padding: 13px 20px;
    cursor: pointer;
    transition: .3s ease-in-out;
    &-light {
      color: #6D7278;
      background-color: #D8D8D8;
      &:hover {
        background-color: darken(#D8D8D8, 10%);
      }
    }
    &-dark {
      color: #fff;
      background-color: #484848;
      &:hover {
        background-color: darken(#484848, 10%);
      }
    }
  }

  .common-px {
    padding-left: 40px;
    padding-right: 40px;
  }
  .border {
    padding-top: 10px;
    padding-bottom: 30px;
    display: flex;
    span {
      margin-right: 2px;
      width: 12px;
      height: 12px;
      display: block;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        transform: rotate(-45deg);
        width: 1px;
        height: 12px;
        background-color: #000;
      }
    }
  }
</style>