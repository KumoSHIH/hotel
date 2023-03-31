<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted, ref, reactive } from 'vue';
import Dialog from '../components/Dialog.vue';

export default {
  components: {
    Dialog
  },
  setup() {
    const route = useRoute();
    let room = reactive({ data: {} });
    let photo = reactive({ data: {} });
    let descriptionShort = reactive({ data: {} });
    let checkInAndOut = reactive({ data: {} });
    let amenities = reactive({ data: {} });
    let Bed = ref('');
    let statusLibox = ref(false);

    const calendar = ref([
      {
        key: 'today',
        highlight: true,
        dates: {
          start: new Date(),
          end: new Date() + 181,
        }
      },
    ]);
    // 不可選的日期 : 今日之前(包含今日)，已預定的日期
    const disabledDates = ref([ { start: null, end: null }]);


    
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
      room.data = res.data.room[0]
      photo.data = res.data.room[0].imageUrl
      descriptionShort.data = res.data.room[0].descriptionShort
      checkInAndOut.data = res.data.room[0].checkInAndOut
      amenities.data = res.data.room[0].amenities
      Bed.value = res.data.room[0].descriptionShort.Bed[0]
      console.log(room);
    }
    let openLibox = () => {
      statusLibox.value = true
      document.querySelector('body').classList.add('lock');
    }
    let closeLibox = () => {
      statusLibox.value = false
      document.querySelector('body').classList.remove('lock');
    }
    // console.log(route.params.id);
    return {
      room,
      photo,
      descriptionShort,
      checkInAndOut,
      amenities,
      Bed,
      calendar,
      disabledDates,
      statusLibox,
      openLibox,
      closeLibox
    }
  }
}
</script>

<template>
  <div>
    <div class="banner">
      <router-link class="logo" :to="{name: 'room'}"><div class="logo-box">WhiteSpace</div></router-link>
      <div class="banner-photo">
        <div class="photo-left">
          <div class="photo-box" :style="{ backgroundImage: 'url('+ photo.data[0] +')' }"></div>
        </div>
        <div class="photo-right">
          <div class="photo-box" :style="{ backgroundImage: 'url('+ photo.data[1] +')' }"></div>
          <div class="photo-box" :style="{ backgroundImage: 'url('+ photo.data[2] +')' }"></div>
        </div>
      </div>
    </div>
    <section class="d-flex jcc">
      <div class="content">
        <div class="content-left">
          <h2>{{ room.data.name }}</h2>
          <p class="fz-14">房客人數限制 : {{ descriptionShort.data.GuestMin }} ~ {{ descriptionShort.data.GuestMax }}人</p>
          <p class="fz-14">床型 : {{ Bed }}</p>
          <p class="fz-14">衛浴數量 : {{ descriptionShort.data['Private-Bath'] }} 間</p>
          <p class="fz-14">房間大小 : {{ descriptionShort.data.Footage }} 平方公尺</p>
          <p class="fz-12">{{ room.data.description }}</p>
          <div class="border">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="time">
            <div>
              <span class="fz-14">Check In</span>
              <p class="fz-20">{{ checkInAndOut.data.checkInEarly }} - {{ checkInAndOut.data.checkInLate }}</p>
            </div>
            <div>
              <span class="fz-14">Check Out</span>
              <p class="fz-20">{{ checkInAndOut.data.checkOut }}</p>
            </div>
          </div>
          <div class="spec">
            <ul>
              <li :class="amenities.data['Wi-Fi'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'wifi']" /></div>
                <span>Wi-Fi</span>
              </li>
              <li :class="amenities.data['Television'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'phone']" /></div>
                <span>電話</span>
              </li>
              <li :class="amenities.data['Great-View'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'mountain-sun']" /></div>
                <span>漂亮的視野</span>
              </li>
              <li :class="amenities.data['Breakfast'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'utensils']" /></div>
                <span>早餐</span>
              </li>
              <li :class="amenities.data['Air-Conditioner'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'wind']" /></div>
                <span>空調</span>
              </li>
              <li :class="amenities.data['Smoke-Free'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fasr', 'ban-smoking']" /></div>
                <span>禁止吸菸</span>
              </li>
              <li :class="amenities.data['Mini-Bar'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'martini-glass-citrus']" /></div>
                <span>Mini Bar</span>
              </li>
              <li :class="amenities.data['Refrigerator'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'box']" /></div>
                <span>冰箱</span>
              </li>
              <li :class="amenities.data['Child-Friendly'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'baby']" /></div>
                <span>適合兒童</span>
              </li>
              <li :class="amenities.data['Room-Service'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fass', 'bell']" /></div>
                <span>Room Service</span>
              </li>
              <li :class="amenities.data['Sofa'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'couch']" /></div>
                <span>沙發</span>
              </li>
              <li :class="amenities.data['Pet-Friendly'] ? 'active' : ''">
                <div class="icon"><font-awesome-icon :icon="['fas', 'dog']" /></div>
                <span>寵物攜帶</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-right">
          <p class="fz-30">NT.{{ room.data.normalDayPrice }}</p>
          <span class="fz-14">平日(一~四)</span>
          <p class="fz-16">NT.{{ room.data.holidayPrice }}</p>
          <span class="fz-14">假日(五~日)</span>
        </div>
      </div>
      <div class="date">
        <div class="date-box">
          <VCalendar 
            :attributes="calendar" 
            :disabled-dates="disabledDates" 
            transparent
            borderless
            expanded />
        </div>
        <div class="btn-reservation fz-16" @click="openLibox">
          <span>預約時段</span>
        </div>
      </div>
    </section>
    <Dialog 
      :class="statusLibox ? 'active': ''"
      :closeLibox="closeLibox"
      />
  </div>
</template>

<style lang="scss" scoped>
  
  .banner {
    position: relative;
    overflow: hidden;
    height: 600px;
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
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .photo-left {
    max-width: 1300px;
    width: 100%;
    position: relative;
    overflow: hidden;
    .photo-box{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }
  }
  .photo-right {
    position: relative;
    overflow: hidden;
    max-width: 620px;
    width: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    .photo-box {
      height: 100%;
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
      z-index: 1;
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
      z-index: 2;
    }
  }
  section {
    padding-top: 47px;
    padding-bottom: 70px;
  }
  .content {
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
      &.active {
        opacity: 1;
      }
    }
    .icon {
      margin-right: 13px;
      width: 25px;
      height: 25px;
      font-size: 20px;
      text-align: center;
    }
  }
  .date {
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .date-box {
    margin-bottom: 25px;
    width: 380px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.15);
  }
  .btn-reservation {
    position: relative;
    display: inline-block;
    &:hover {
      span {
        background-color: darken(#575757, 10%);
      }
    }
    &::after {
      content: '';
      width: 115px;
      height: 45px;
      position: absolute;
      z-index: 0;
      right: -9px;
      bottom: -9px;
      background:repeating-linear-gradient(45deg, 
      #999999 0, #999999 3%, transparent 0%, transparent 5%);
    }
    span {
      padding: 15px 24px;
      display: block;
      color: #fff;
      background-color: #575757;
      cursor: pointer;
      transition: .3s ease-in-out;
      z-index: 2;
      position: relative;
    }
  }
</style>