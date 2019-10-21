<template>
  <div class="chatbox-body bc-g-16">
    <div class="toolbar-container">
      <div class="now-friend-wrapper">
        <div class="head-photo">
          <div class="head-photo-inner">
            <img :src="nowFriend.img.src" :alt="nowFriend.img.alt" />
          </div>
        </div>

        <p class="name fz-18 fw-700 lh-12 ls-10">{{ nowFriend.name }}</p>
      </div>
      <!--  -->
      <div class="btn__tool-wrapper">
        <div id="btnToolSearch" class="btn__tool btn__tool--search" @click="toggleSearchBar">
          <img src="../assets/images/ic_search.png" alt />
        </div>

        <div class="btn__tool btn__tool--note">
          <img src="../assets/images/ic_note.png" alt />
        </div>
      </div>

      <div id="searchBar" class="search-bar bc-g-16">
        <input
          v-model="searchKeyword"
          class="ff-sans-serif fz-16 ls-10"
          type="text"
          placeholder="輸入關鍵字..."
          @keydown.enter="doSearch"
        />

        <div class="group">
          <p
            v-if="resultQty"
            class="result ls-10 c-g-10"
          >1 {{ multipleLanguagesTitle.searchResult[nowLanguage] }}</p>
          <div class="btn-search-close" @click="toggleSearchBar">
            <img src="../assets/images/ic_close1.png" alt />
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="msg-window">
      <div class="msg-window__inner">
        <div
          v-for="(msg, index) in nowFriend.msgs"
          :key="nowFriend.name + index"
          :class="['msg-item', {right: msg.who === 'me', left: msg.who === 'you'}]"
        >
          <p class="text lh-12 ls-10 c-g-16" v-html="msg.text"></p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="input-bar">
      <input class="ff-sans-serif fz-16 lh-12 ls-10" type="text" placeholder="輸入訊息..." />
      <div class="icon-send">
        <img src="../assets/images/ic_sent.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: "",
      resultQty: null,
      oriMsgs: null
    };
  },

  computed: {
    nowLanguage() {
      return this.$store.state.nowLanguage;
    },
    multipleLanguagesTitle() {
      return this.$store.state.multipleLanguagesTitle;
    },
    nowFriend() {
      return this.$store.state.nowFriend;
    }
  },

  methods: {
    toggleSearchBar() {
      if (
        document.getElementById("btnToolSearch").classList.contains("active")
      ) {
      } else {
        // this.$store.commit("setOriMsgs");
      }

      document.getElementById("btnToolSearch").classList.toggle("active");
      document.getElementById("searchBar").classList.toggle("active");
    },

    doSearch() {
      // if (this.oriMsgs === null) {
      //   this.oriMsgs = this.nowFriend.msgs;
      //   console.log(this.oriMsgs);
      // }

      console.log(this.searchKeyword);
      // console.log(this.nowFriend.msgs);
      // const arrSearched = [...this.nowFriend.msgs];
      // console.log(arrSearched);

      // this.nowFriend.msgs.forEach((item, index) => {
      //   console.log(index);
      // });

      // this.$store.commit("highlightSearchResult",);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/abstracts/variables";
@import "../assets/scss/abstracts/mixins";

.chatbox-body {
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  .toolbar-container {
    display: flex;
    align-items: center;

    height: 68px;
    padding-left: 24px;
    padding-right: 24px;

    z-index: 10;

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 5px;

      background-image: linear-gradient(
        to bottom,
        rgba(#000, 0.2),
        transparent
      );
    }
  }

  .now-friend-wrapper {
    display: flex;
    align-items: center;
  }

  .head-photo {
    width: 46px;
    height: 46px;

    margin-right: 8px;

    border: 1px solid $c-p-2;
    border-radius: 50%;
    overflow: hidden;

    &-inner {
      padding-top: 100%;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .input-bar {
    display: flex;

    height: 70px;
    width: 100%;
    border-top: 1px solid $c-p-2;

    input {
      width: 100%;
      height: 100%;
      border: none;

      padding-left: 16px;
    }
  }

  .icon-send {
    display: flex;
    align-items: center;

    height: 100%;
    padding-left: 24px;
    padding-right: 24px;

    cursor: pointer;

    img {
      height: 24px;
      transition: 0.3s;
    }

    @include hover {
      &:hover {
        img {
          transform: translateX(3px);
        }
      }
    }
  }

  .msg-window {
    display: flex;

    width: 100%;
    height: calc(100vh - 66px - 68px - 70px);

    padding-bottom: 40px;
    padding-left: 24px;
    padding-right: 24px;

    overflow-y: auto;

    &__inner {
      width: 100%;
      margin-top: auto;
    }
  }

  .msg-item {
    display: flex;

    .text {
      background-color: $c-p-2;
    }

    &.right {
      justify-content: flex-end;

      .text {
        background-color: $c-p-1;
      }
    }

    & + .msg-item {
      margin-top: 4px;
    }

    .text {
      padding: 10px 24px;
      border-radius: 50px;
    }
  }

  .btn__tool {
    width: 40px;
    height: 40px;

    padding: 6px;

    border-radius: 50%;
    overflow: hidden;

    cursor: pointer;

    & + .btn__tool {
      margin-left: 4px;
    }

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: 1px solid $c-g-13;
      border-radius: 50%;
      background-color: $c-g-15;
      //
      opacity: 0;
      transition: opacity 0.3s;
    }

    &.active {
      &::before {
        opacity: 1;
      }
    }

    &-wrapper {
      display: flex;
      margin-left: auto;
    }
  }

  .search-bar {
    display: flex;

    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 60px;
    border-bottom: 1px solid $c-p-2;
    //
    opacity: 0;
    pointer-events: none;
    transform: translateY(-4px);
    transition: 0.3s;

    &.active {
      opacity: 1;
      pointer-events: initial;
      transform: initial;
    }

    input {
      flex-grow: 1;

      border: none;
      padding-left: 20px;

      // caret-color: $c-p-1;
    }

    .group {
      display: flex;
      align-items: center;

      margin-left: auto;
      padding-left: 20px;
    }

    .btn-search-close {
      display: flex;
      align-items: center;

      height: 100%;
      padding-right: 24px;
      padding-left: 20px;

      cursor: pointer;

      img {
        height: 30px;
        transition: 0.3s;
      }

      @include hover {
        &:hover {
          img {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
}
</style>