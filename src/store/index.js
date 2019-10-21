import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // status
    nowLanguage: 'ch',
    nowUser: {
      img: { src: 'https://picsum.photos/500/500?random=4', alt: '' },
      name: '潔西卡'
    },
    nowFriend: null,
    // isSearching: false,
    // languages
    languages: {
      ch: '中文',
      en: 'English'
    },
    multipleLanguagesTitle: {
      friendsList: {
        ch: '好友列表',
        en: 'Friends List'
      },

      searchResult: {
        ch: '則相符訊息',
        en: 'items'
      }
    },
    // data
    friendsList: {
      friends: [
        {
          id: '1',
          img: { src: 'https://picsum.photos/500/500?random=1', alt: '' },
          name: '保羅',
          intro: '大家好，我是保羅～',
          msgs: [
            { who: 'me', text: `保羅` },
            { who: 'me', text: `你好, 我是潔西卡` },
            { who: 'me', text: `我喜歡吃的食物有` },
            { who: 'me', text: `各種巧克力口味的甜點` }
          ]
        },
        {
          id: '2',
          img: { src: 'https://picsum.photos/500/500?random=2', alt: '' },
          name: '傑克',
          intro: '大家好，我是傑克～',
          msgs: [
            { who: 'me', text: `傑克` },
            { who: 'me', text: `你好, 我是潔西卡` },
            { who: 'me', text: `我喜歡做的運動為` },
            { who: 'me', text: `游泳, 跑步` },
            { who: 'me', text: `傑克` },
            { who: 'me', text: `你好, 我是潔西卡` },
            { who: 'me', text: `我喜歡做的運動為` },
            { who: 'me', text: `游泳, 跑步` },
            { who: 'me', text: `傑克` },
            { who: 'me', text: `你好, 我是潔西卡` },
            { who: 'me', text: `我喜歡做的運動為` },
            { who: 'me', text: `游泳, 跑步` },
            { who: 'you', text: `Hi, 潔西卡` },
            { who: 'me', text: `你好, 我是潔西卡` },
            { who: 'me', text: `我喜歡做的運動為` },
            { who: 'me', text: `游泳, 跑步` },
            { who: 'me', text: `傑克` },
            { who: 'me', text: `你好, 我是潔西卡` },
            { who: 'me', text: `我喜歡做的運動為` },
            { who: 'me', text: `游泳, 跑步` }
          ]
        },
        {
          id: '3',
          img: { src: 'https://picsum.photos/500/500?random=3', alt: '' },
          name: '傑森',
          intro: '大家好，我是傑森～',
          msgs: [
            { who: 'me', text: `傑森` },
            { who: 'me', text: `你好, 我是潔西卡` },
            { who: 'me', text: `我喜歡的動物為` },
            { who: 'me', text: `貓, 狗` }
          ]
        }
      ]
    }
    // search
    // oriMsgs: null
  },

  getters: {},

  mutations: {
    changeLangs(state, lang) {
      console.log('mutations changeLangs', lang);
      state.nowLanguage = lang;
    },
    changeFriend(state, who) {
      console.log('mutations changeFriend', who);
      state.nowFriend = who;
    }
    // setOriMsgs(state) {
    //   state.oriMsgs = state.nowFriend.msgs;
    // }
    // highlightSearchResult(state, arr) {
    //   console.log('mutations highlightSearchResult');
    //   state.nowFriend.msgs = arr;
    // }
  },
  actions: {},
  modules: {}
});
