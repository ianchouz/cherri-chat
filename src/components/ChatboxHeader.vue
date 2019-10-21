<template>
  <div class="chatbox-header bc-p-1">
    <p class="chatbox-header__title fz-20 fw-700 ls-10 c-g-16">Cherri Chat</p>

    <div class="col">
      <div class="langs-wrapper">
        <p
          v-for="(language, key) in languages"
          :key="key"
          :class="['btn-lang c-g-16', {active: key === nowLanguage}]"
          @click="changeLangs(key)"
        >{{ language }}</p>
      </div>

      <div class="user-wrapper">
        <div class="head-photo">
          <div class="head-photo-inner">
            <img :src="nowUser.img.src" :alt="nowUser.img.alt" />
          </div>
        </div>

        <p class="name fz-18 fw-700 lh-12 ls-10 c-g-16">{{ nowUser.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    languages() {
      return this.$store.state.languages;
    },
    nowUser() {
      return this.$store.state.nowUser;
    },
    nowLanguage() {
      return this.$store.state.nowLanguage;
    }
  },

  methods: {
    changeLangs(lang) {
      // console.log(lang);
      this.$store.commit("changeLangs", lang);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/abstracts/variables";
@import "../assets/scss/abstracts/mixins";

.chatbox-header {
  display: flex;
  align-items: center;

  height: 66px;
  padding-left: 24px;

  & > .col {
    display: flex;
    align-items: center;

    height: 100%;
  }

  &__title {
    margin-right: auto;
  }

  .langs-wrapper {
    display: flex;
    margin-right: 24px;
  }

  .btn-lang {
    padding: 6px 16px;
    border: 1px solid #fff;
    cursor: pointer;
    border-radius: 50px;
    transition: 0.3s;

    &.active {
      background-color: #fff;
      color: $c-p-1;
    }

    & + .btn-lang {
      margin-left: 8px;
    }
  }

  .user-wrapper {
    display: flex;
    align-items: center;

    height: 100%;
    border-left: 1px solid rgba(#fff, 0.5);
    padding-left: 20px;
    padding-right: 32px;
  }

  .head-photo {
    flex-shrink: 0;

    width: 40px;
    height: 40px;

    margin-right: 8px;

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
}
</style>