<template>
  <transition name="fade">
    <div
        :key="id"
        v-show="visible"
        class="message"
        :class="type"
        :style="positionStyle"
        @mouseenter="clearTimer"
        @mouseleave="startTimer">
      {{ message }}
    </div>
  </transition>

</template>

<script>
export default {
  name: "message",
  data() {
    return {
      id: '',
      visible: false,
      closed: false,
      onClose: null,
      type: '',
      message: '',
      duration: 3000,
      timer: null,
      verticalOffset: 20,
    }
  },
  computed: {
    positionStyle() {
      return {
        'top': `${this.verticalOffset}px`
      };
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
  }
}
</script>

<style scoped lang="scss">
.message {
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  padding: 5px 15px;
  background-color: #fff;
  font-size: 12px;
}

.success {
  border-color: var(--emphasizeColor);
}

.error {
  border-color: red;

}

.waring {
  border-color: darkorange;
}
</style>
