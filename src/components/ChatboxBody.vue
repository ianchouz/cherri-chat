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
        <div
          :class="['btn__tool btn__tool--search', {active: isSearching}]"
          @click="toggleSearchBar"
        >
          <img src="../assets/images/ic_search.png" alt />
        </div>

        <div :class="['btn__tool btn__tool--note', {active: isNoting}]" @click="toggleNotebox">
          <img src="../assets/images/ic_note.png" alt />
        </div>
      </div>

      <div :class="['search-bar bc-g-16', {active: isSearching}]">
        <input
          :value="searchKeyword"
          class="ff-sans-serif fz-16 ls-10"
          type="text"
          placeholder="輸入關鍵字..."
          @input="updateSearchKeyword"
          @keydown.enter="doSearch"
        />

        <div class="group">
          <p
            v-if="resultQty"
            class="result ls-10 c-g-10"
          >{{ resultQty }} {{ multipleLanguagesTitle.searchResult[nowLanguage] }}</p>
          <div class="btn-search-close" @click="toggleSearchBar">
            <img src="../assets/images/ic_close1.png" alt />
          </div>
        </div>
      </div>

      <div :class="['note-container bc-g-16', {active: isNoting}]">
        <div class="input-wrapper">
          <textarea
            :value="nowFriend.noteTemp"
            class="ff-sans-serif fz-16 ls-10"
            :placeholder="multipleLanguagesTitle.inputMsg[nowLanguage] + '...'"
            @input="updateNoteTemp"
          ></textarea>

          <div class="btn-submit-note bc-p-1" @click="addNote">
            <p class="text c-g-16">{{ multipleLanguagesTitle.addNote[nowLanguage] }}</p>
          </div>
        </div>

        <div v-if="nowFriend.notes.length > 0" class="note-wrapper">
          <div
            v-for="(note, index) in nowFriend.notes"
            :key="nowFriend.name + index"
            class="note-item"
          >
            <p class="time-stamp fz-12 lh-12 ls-10 c-p-1">{{ note.time | msToDate }}</p>
            <p class="note-msg fz-14 lh-12 ls-10">{{ note.msg }}</p>

            <div class="btn-delete-note" @click="deleteNote(index)">
              <img src="../assets/images/ic_close2.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div id="msgWindow" class="msg-window">
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
    return {};
  },

  filters: {
    msToDate(ms) {
      const d = new Date(ms);
      return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    }
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
    },
    // search
    isSearching() {
      return this.$store.state.isSearching;
    },
    searchKeyword() {
      return this.$store.state.searchKeyword;
    },
    oriMsgs() {
      return this.$store.state.oriMsgs;
    },
    resultQty() {
      return this.$store.state.resultQty;
    },
    // note
    isNoting() {
      return this.$store.state.isNoting;
    }
  },

  methods: {
    toggleSearchBar() {
      this.$store.commit("changeIsSearching");
    },

    // 雙向綁定
    updateSearchKeyword(e) {
      this.$store.commit("updateSearchKeyword", e.target.value.trim());
    },

    doSearch() {
      if (this.searchKeyword) {
        console.log(this.searchKeyword);
        if (this.oriMsgs === null) {
          this.$store.commit("setOriMsgs");
        }

        // 以關鍵字拆開，替換成 %&$
        const arrSplit = this.nowFriend.msgs.map(item => {
          return {
            who: item.who,
            text: item.text.split(this.searchKeyword).join("%&$")
          };
        });
        console.log(arrSplit);

        let num = 0;

        const arrHighlighted = arrSplit.map(item => {
          while (item.text.includes("%&$")) {
            num++;
            item.text = this.highlightText(item.text);
          }
          // console.log(item);
          return item;
        });

        // 相符筆數
        console.log(num);
        this.$store.commit("setResultQty", num);

        // mutations
        console.log(arrHighlighted);
        this.$store.commit("highlightSearchResult", arrHighlighted);
      }
    },

    highlightText(text) {
      return text.replace(
        "%&$",
        `<span class="highlight">${this.searchKeyword}</span>`
      );
    },

    // note
    // 雙向綁定
    toggleNotebox() {
      this.$store.commit("changeIsNoting");
    },

    updateNoteTemp(e) {
      this.$store.commit("updateNoteTemp", e.target.value.trim());
    },

    addNote() {
      // console.log(this.nowFriend.noteTemp);

      this.$store.commit("addNote", {
        time: Date.now(),
        msg: this.nowFriend.noteTemp
      });
      // 清空
      this.$store.commit("updateNoteTemp", "");
    },

    deleteNote(index) {
      // console.log(index);
      this.$store.commit("deleteNote", index);
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

      span {
        vertical-align: top;
      }
    }

    .highlight {
      background-color: $c-p-3;
      color: #000;
      font-weight: 700;
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

  // note
  .note-container {
    position: absolute;
    right: 10px;
    top: calc(100% + 10px);

    width: 330px;
    padding: 24px;
    border-radius: 3px;

    filter: drop-shadow(0 0 3px rgba(#000, 0.3));
    z-index: 10;
    //
    opacity: 0;
    pointer-events: none;
    transition: 0.3s;

    &.active {
      opacity: 1;
      pointer-events: initial;
    }

    &::before {
      content: "";
      display: block;
      position: absolute;
      bottom: 100%;
      right: 20px;

      height: 0;
      width: 0;
      border-width: 14px;
      border-color: transparent transparent #fff;
      border-style: solid;
    }

    textarea {
      display: block;
      width: 100%;
      height: 100px;

      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid $c-p-1;
    }

    .btn-submit-note {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      padding: 10px;

      cursor: pointer;
    }
  }

  .note-wrapper {
    border-top: 1px solid $c-p-2;
    padding-top: 16px;
    margin-top: 16px;

    max-height: 50vh;
    overflow: auto;
  }

  .note-item {
    min-height: 100px;
    padding: 10px;
    border: 1px solid $c-p-2;

    & + .note-item {
      margin-top: 8px;
    }
  }

  .time-stamp {
    margin-bottom: 14px;
  }

  .btn-delete-note {
    position: absolute;
    top: 0;
    right: 0;

    padding: 10px;

    cursor: pointer;

    img {
      display: block;
      width: 12px;
    }
  }
}
</style>