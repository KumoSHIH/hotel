<script>
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import Logo from '../components/Logo.vue'

export default {
  name: 'Room',
  components: {
    Logo
  },
  setup(){
    const data = reactive([]);
    let info = reactive({
      name: '',
      index: '',
      num: '',
      photo: '',
    })

    onMounted(()=> {
      getData()
    })
    let getData = async() => {
      const url = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
      const token = 'Bearer L8mpl5aBnzURp4mYIQqYbhRV8bKkCWDoaDWWEObspDxUFmF1BXZzkpkt3aLc';

      const res = await axios.get(url,{
        headers: {
          Authorization: token,
          accept: 'application/json',
        }
      })

      Object.assign(data, res.data.items)
      // 預設資料
      info.name = data[0].name;
      info.index = 0;
      info.num = '01';
      info.photo = data[0].imageUrl;
    }
    let hoverHandler = (item,index) => {
      info.name = item.name;
      info.index = index;
      info.num = `0${index+1}`;
      info.photo = item.imageUrl;
    }
    return {
      data,
      hoverHandler,
      info
    }
  }
}
</script>
<template>
  <div 
    :style="{ backgroundImage: 'url('+ info.photo +')'}"
    class="container">
    <div class="top">
      <Logo/>
      <ul class="room-list">
        <li
          v-for="item,index in data"
          :key="item.id"
          :class="index === info.index ? 'active' : ''"
          @mouseenter="hoverHandler(item,index)">
          <a href="javascript:;">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="room-info">
        <div class="num">{{ info.num }}</div>
        <p>{{ info.name }}</p>
      </div>
      <div class="other">
        <ul class="social d-flex">
          <li>
            <a href="javascript:;">
              <font-awesome-icon :icon="['fab', 'square-facebook']" />
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </li>
        </ul>
        <ul class="contact">
          <li class="d-flex aic">
            <font-awesome-icon icon="phone" />
            <p class="fz14">02-17264937</p>
          </li>
          <li class="d-flex aic">
            <font-awesome-icon icon="envelope" />
            <p class="fz14">whitespace@whitespace.com.tw</p>
          </li>
          <li class="d-flex aic">
            <font-awesome-icon icon="house" />
            <p class="fz14">台北市羅斯福路十段30號</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../assets/scss/_mixin.scss';

  .container{
    padding: 50px 0 50px 55px;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: .3s ease-in-out;
    @include rwdmax(767) {
      padding: 30px 0;
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    @include rwdmax(767) {
      flex-direction: column;
      align-items: center;
    }
  }
  .bottom{
    display: flex;
    justify-content: space-between;
    @include rwdmax(767) {
      flex-direction: column;
      margin-top: 30px;
      padding: 0 30px; 
    }
  }
  .room-list {
    max-width: 305px;
    width: 100%;
    padding: 35px 0;
    background-color: #fff;
    position: relative;
    li {
      padding: 0 35px;
      letter-spacing: 1.5px;
      font-size: 14px;
      text-align: left;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        width: 0px;
        height: 1px;
        background-color: #000;
        transition: width .3s ease-in-out;
      }
      &.active,
      &:hover {
        &::after {
          width: 23px;
        }
        a {
          opacity: .8;
        }
      }
    }
    a {
      padding: 20px 0;
    }
    &::after{
      content: '';
      width: 280px;
      height: 20px;
      position: absolute;
      bottom: -20px;
      right: 0;
      background:repeating-linear-gradient(45deg, 
      #fff 0, #fff 2%, transparent 0%, transparent 4.5%);
    }
    @include rwdmax(767) {
      max-width: 280px;
      margin-top: 30px;
      margin-left: auto;
      padding: 20px 0;
      li {
        padding: 0 25px;
        &.active,
        &:hover {
          &::after {
            width: 15px;
          }
        }
      }
      a {
        padding: 15px 0;
      }
      &::after{
        width: 90%;
      }
    }
  }
  .room-info {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: end;
    color: #fff;
    text-align: left;
    .num {
      display: inline-block;
      font-size: 66px;
      padding: 0 5px;
      position: relative;
      &::after {
        content: '';
        width: 100%;
        height: 20px;
        position: absolute;
        bottom: 0px;
        left: 0;
        background:repeating-linear-gradient(45deg, 
      #fff 0, #fff 5%, transparent 0%, transparent 11%);
      }
    }
    p {
      padding-top: 15px;
      letter-spacing: 2.5px;
      font-size: 24px;
    } 
  }
  .other {
    margin-top: 120px;
    max-width: 280px;
    width: 100%;
    font-size: 20px;
    color: #fff;
    @include rwdmax(767) {
      margin-top: 80px;
    }
  }
  .social {
    margin-bottom: 50px;
    font-size: 22px;
    li {
      margin-right: 10px;
    }
    @include rwdmax(767) {
      margin-bottom: 20px;
    }
  }
  .contact {
    li {
      margin-bottom: 15px;
    }
    p {
      margin-left: 10px;
    }
  }
</style>