<template>
  <section class="chatbox-container">
    <ChatboxHeader />

    <div class="chatbox-body-outer">
      <div class="welcome-container">
        <div class="welcome-wrapper">
          <div class="welcome-img">
            <div class="welcome-img-inner">
              <img src="../assets/images/img_default.png" />
            </div>
          </div>

          <p class="welcome-msg fz-24 fw-700 ls-10 c-p-1">開始使用Cherri Chat!</p>
        </div>
      </div>

      <transition>
        <ChatboxBody v-if="nowFriend !== null" />
      </transition>
    </div>
  </section>
</template>

<script>
import ChatboxHeader from "./ChatboxHeader.vue";
import ChatboxBody from "./ChatboxBody.vue";

export default {
  components: {
    ChatboxHeader,
    ChatboxBody
  },
  computed: {
    nowFriend() {
      return this.$store.state.nowFriend;
    }
  }
};
</script>

<style lang="scss">
.chatbox-container {
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  height: 100%;

  .chatbox-body-outer {
    flex-grow: 1;
    width: 100%;
  }

  .welcome-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .welcome-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .welcome-img {
    width: 240px;
    margin-bottom: 20px;

    &-inner {
      width: 100%;
    }

    img {
      width: 100%;
    }
  }
}
</style>