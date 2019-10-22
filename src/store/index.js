import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const resetOriMsgs = state => {
  state.searchKeyword = '';
  if (state.oriMsgs) {
    state.nowFriend.msgs = state.oriMsgs;
    state.oriMsgs = null;
    state.resultQty = null;
  }
};

export default new Vuex.Store({
  state: {
    // status
    nowLanguage: 'ch',
    nowUser: {
      img: { src: 'https://picsum.photos/500/500?random=4', alt: '' },
      name: '潔西卡'
    },
    nowFriend: null,
    isSearching: false,
    isNoting: false,
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
      },

      inputMsg: {
        ch: '輸入訊息',
        en: 'Message'
      },

      addNote: {
        ch: '新增',
        en: 'Add'
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
            { who: 'me', text: `各種巧克力口味的甜點` },
            { who: 'me', text: `保羅愛保羅` }
          ],
          notes: [
            { time: 1571715684012, msg: `備忘訊息1` },
            { time: 1571715684012, msg: `備忘訊息2` }
          ],
          noteTemp: ``
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
          ],
          notes: [
            { time: 1571715684012, msg: `備忘訊息1` },
            { time: 1571715684012, msg: `備忘訊息2` }
          ],
          noteTemp: ``
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
          ],
          notes: [
            { time: 1571715684012, msg: `備忘訊息1` },
            { time: 1571715684012, msg: `備忘訊息2` }
          ],
          noteTemp: ``
        }
      ]
    },
    // search
    searchKeyword: '',
    oriMsgs: null,
    resultQty: null
  },

  getters: {},

  mutations: {
    changeLangs(state, lang) {
      console.log('mutations changeLangs', lang);
      state.nowLanguage = lang;
    },

    changeFriend(state, who) {
      console.log('mutations changeFriend', who);
      // 關閉搜尋列 & 重置
      if (state.isSearching) {
        state.isSearching = !state.isSearching;
        resetOriMsgs(state);
      }

      state.nowFriend = who;

      setTimeout(() => {
        document
          .getElementById('msgWindow')
          .scrollTo(0, document.getElementById('msgWindow').scrollHeight);
      });
    },

    // search
    changeIsSearching(state) {
      console.log('mutations changeIsSearching');

      // 重置
      if (state.isSearching) {
        resetOriMsgs(state);
      }

      state.isSearching = !state.isSearching;
    },

    updateSearchKeyword(state, value) {
      console.log('mutations updateSearchKeyword');
      state.searchKeyword = value;
    },

    setOriMsgs(state) {
      console.log('mutations setOriMsgs');
      state.oriMsgs = state.nowFriend.msgs;
    },

    highlightSearchResult(state, arr) {
      console.log('mutations highlightSearchResult', arr);
      state.nowFriend.msgs = arr;
    },

    setResultQty(state, num) {
      console.log('mutations setResultQty');
      state.resultQty = num;
    },

    // note
    changeIsNoting(state) {
      console.log('mutations changeIsNoting');

      state.isNoting = !state.isNoting;
    },

    updateNoteTemp(state, value) {
      console.log('mutations updateNoteTemp');
      state.nowFriend.noteTemp = value;
    },

    addNote(state, value) {
      state.nowFriend.notes.push(value);
    },

    deleteNote(state, value) {
      state.nowFriend.notes.splice(value, 1);
    }
  },
  actions: {},
  modules: {}
});
