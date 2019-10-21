<template>
  <section class="friends-list-container">
    <p
      class="friends-list-container__title ls-10 c-g-5"
    >{{ multipleLanguagesTitle.friendsList[nowLanguage] }}({{ friendsList.friends.length }})</p>

    <div class="friends-list-wrapper">
      <div
        v-for="friend in friendsList.friends"
        :key="friend.id"
        class="friend-item"
        @click="changeFriend(friend)"
      >
        <div class="head-photo">
          <div class="head-photo-inner">
            <img :src="friend.img.src" :alt="friend.img.alt" />
          </div>
        </div>

        <div class="group">
          <p class="name fz-20 fw-700 lh-12 ls-10">{{ friend.name }}</p>
          <p class="intro lh-12 ls-10 c-g-10">{{ friend.intro }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    nowLanguage() {
      return this.$store.state.nowLanguage;
    },
    multipleLanguagesTitle() {
      return this.$store.state.multipleLanguagesTitle;
    },
    friendsList() {
      return this.$store.state.friendsList;
    }
  },
  methods: {
    changeFriend(who) {
      // console.log(who);
      this.$store.commit("changeFriend", who);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/abstracts/variables";
@import "../assets/scss/abstracts/mixins";

.friends-list-container {
  flex-shrink: 0;
  width: 300px;
  height: 100%;

  box-shadow: 0 0 10px rgba(#000, 0.3);

  overflow: auto;
  z-index: 100;

  &__title {
    display: flex;
    align-items: center;

    height: 46px;

    padding-left: 16px;
    padding-right: 16px;

    border-bottom: 1px solid $c-p-2;
  }

  .friend-item {
    display: flex;

    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;

    border-bottom: 1px solid $c-p-2;

    cursor: pointer;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba($c-g-15, 0.6);
      //
      opacity: 0;
      transition: opacity 0.3s;
    }

    @include hover {
      &:hover {
        &::before {
          opacity: 1;
        }
      }
    }
  }

  .head-photo {
    flex-shrink: 0;

    width: 56px;
    height: 56px;

    margin-right: 14px;

    border-radius: 50%;
    border: 1px solid $c-p-2;
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

  .name {
    margin-top: 3px;
    margin-bottom: 6px;
  }
}
</style>