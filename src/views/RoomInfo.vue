<script>
import axios from 'axios';
import { useRoute } from 'vue-router'
import { onMounted, ref, reactive } from 'vue';

export default {
  
  setup() {
    const route = useRoute();
    const room = reactive({});
    const photo = reactive({});
    const descriptionShort = reactive({});
    const checkInAndOut = reactive({});
    const amenities = reactive({});

    onMounted(() => {
      getRoom();
    })
    let getRoom = async() => {
      const url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${route.params.id}`;
      const token = 'Bearer L8mpl5aBnzURp4mYIQqYbhRV8bKkCWDoaDWWEObspDxUFmF1BXZzkpkt3aLc';

      const res = await axios.get(url, {
        headers: {
          Authorization: token,
          accept: 'application/json',
        }
      })
      // console.log(res);
      Object.assign(room, res.data.room[0])
      Object.assign(photo, res.data.room[0].imageUrl)
      Object.assign(descriptionShort, res.data.room[0].descriptionShort)
      Object.assign(checkInAndOut, res.data.room[0].checkInAndOut)
      Object.assign(amenities, res.data.room[0].amenities)
      console.log(room);
    }
    // console.log(route.params.id);
    return {
      room,
      photo,
      descriptionShort,
      checkInAndOut,
      amenities
    }
  }
}
</script>

<template>
  <div>
    <div class="banner">
      <div class="logo">
        <div class="logo-box">WhiteSpace</div>
      </div>
      <div class="banner-photo">
        <div class="photo-left">
          <div class="photo-box" :style="{ backgroundImage: 'url('+ photo[0] +')' }"></div>
        </div>
        <div class="photo-right">
          <div class="photo-box box1" :style="{ backgroundImage: 'url('+ photo[1] +')' }"></div>
          <div class="photo-box box2" :style="{ backgroundImage: 'url('+ photo[2] +')' }"></div>
        </div>
      </div>
    </div>
    <section class="d-flex jcc">
      <div class="content">
        <div class="content-left">
          <h2>{{ room.name }}</h2>
          <p class="fz-14">房客人數限制 : {{ descriptionShort.GuestMin }} ~ {{ descriptionShort.GuestMax }}人</p>
          <p class="fz-14">床型 : {{ descriptionShort.Bed }}</p>
          <p class="fz-14">衛浴數量 : {{ descriptionShort['Private-Bath'] }} 間</p>
          <p class="fz-14">房間大小 : {{ descriptionShort.Footage }} 平方公尺</p>
          <p class="fz-12">{{ room.description }}</p>
          <div class="border">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="time">
            <div>
              <span class="fz-14">Check In</span>
              <p class="fz-20">{{ checkInAndOut.checkInEarly }} - {{ checkInAndOut.checkInLate }}</p>
            </div>
            <div>
              <span class="fz-14">Check Out</span>
              <p class="fz-20">{{ checkInAndOut.checkOut }}</p>
            </div>
          </div>
          <div class="spec">
            <ul>
              <li :class="!amenities[Wi-Fi] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'wifi']" /></div>
                <span>Wi-Fi</span>
              </li>
              <li :class="!amenities[Television] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'phone']" /></div>
                <span>電話</span>
              </li>
              <li :class="!amenities[Great-View] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'mountain-sun']" /></div>
                <span>漂亮的視野</span>
              </li>
              <li :class="!amenities[Breakfast] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'utensils']" /></div>
                <span>早餐</span>
              </li>
              <li :class="!amenities[Air-Conditioner] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'wind']" /></div>
                <span>空調</span>
              </li>
              <li :class="!amenities[Smoke-Free] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fasr', 'ban-smoking']" /></div>
                <span>禁止吸菸</span>
              </li>
              <li :class="!amenities[Mini-Bar] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'martini-glass-citrus']" /></div>
                <span>Mini Bar</span>
              </li>
              <li :class="!amenities[Refrigerator] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'box']" /></div>
                <span>冰箱</span>
              </li>
              <li :class="!amenities[Child-Friendly] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'baby']" /></div>
                <span>適合兒童</span>
              </li>
              <li :class="!amenities[Room-Service] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fass', 'bell']" /></div>
                <span>Room Service</span>
              </li>
              <li :class="!amenities[Sofa] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'couch']" /></div>
                <span>沙發</span>
              </li>
              <li :class="!amenities[Pet-Friendly] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'dog']" /></div>
                <span>寵物攜帶</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-right">
          <p class="fz-30">NT.{{ room.normalDayPrice }}</p>
          <span class="fz-14">平日(一~四)</span>
          <p class="fz-16">NT.{{ room.holidayPrice }}</p>
          <span class="fz-14">假日(五~日)</span>
        </div>
      </div>
      <div class="date">
        <div class="date-box"></div>
        <div class="btn-reservation">預約時段</div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .banner {
    height: 600px;
    // background-color: #d9d9d9;
    padding: 50px 50px 0;
  }
  .banner-photo {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    .photo-box {
      position: relative;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .photo-left {
    max-width: 1300px;
    width: 100%;
    // border: solid 1px;
    .photo-box{
      padding-bottom: 46.1%;
    }
  }
  .photo-right {
    max-width: 620px;
    width: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    .photo-box {
      // border: solid 1px;
      padding-bottom: 48.38%;
    }
  }

  .logo {
    max-width: 150px;
    position: relative;
    cursor: pointer;
    &::after {
      content: '';
      width: 150px;
      height: 45px;
      position: absolute;
      left: -10px;
      top: -10px;
      background:repeating-linear-gradient(45deg, 
      #999999 0, #999999 3%, transparent 0%, transparent 6%);
    }
    &-box {
      padding: 13px 15px; 
      border: solid 1px;
      font-weight: bold;
      font-size: 18px;
      letter-spacing: 1.88px;
      background-color: #d9d9d9;
      position: relative;
      z-index: 1;
    }
  }
  .content {
    padding-top: 47px;
    display: flex;
    justify-content: center;
    &-left{
      max-width: 480px;
      width: 100%;
      text-align: left;
      h2 {
        padding-bottom: 30px;
        letter-spacing: 3.76px;
        font-size: 36px;
      }
      p {
        padding-bottom: 10px;
        line-height: 1.3;
        &.fz-12{
          line-height: 20px;
          letter-spacing: 1.25px;
        }
      }
    }
    &-right{
      padding-left: 40px;
      text-align: right;
      p,span{
        padding-bottom: 15px;
        letter-spacing: 3.3px;
      }
      span{
        color: #6D7278;
        display: block;
      }
    }
  }
  .border {
    padding-top: 15px;
    padding-left: 5px;
    display: flex;
    span {
      margin-right: 2px;
      width: 12px;
      height: 12px;
      display: block;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        transform: rotate(-45deg);
        width: 1px;
        height: 12px;
        background-color: #000;
      }
    }
  }
  .time {
    padding-top: 28px;
    padding-bottom: 35px;
    display: flex;
    >div {
      margin-right: 90px;
      letter-spacing: 2px;
    }
    p {
      padding-top: 5px;
    }
  }
  .spec {
    max-width: 480px;
    width: 100%;
    background-color: #f0f0f0;
    ul {
      padding: 30px 0 30px 30px;
      display: flex;
      flex-wrap: wrap;
    }
    li {
      width: calc(100% / 3);
      padding: 15px 0;
      font-size: 12px;
      display: flex;
      align-items: center;
      opacity: .3;
      &.active{
        opacity: 1;
      }
    }
    .icon{
      margin-right: 13px;
      width: 25px;
      height: 25px;
      font-size: 20px;
      text-align: center;
    }
  }
</style>