<template>
  <transition>
    <div class="ui8-select">
      <span class="active-option">{{ conversion }}</span>
      <svg class="triangle" width="8" height="6" viewBox="0 0 8 6">
        <path fill="#FFF" fill-rule="evenodd" d="M0 0h8L4 6z"></path>
      </svg>
      <div class="options-wrapper">
        <ol class="options">
          <!--        <li class="option active selected" ng-class="{ 'active selected': $ctrl.sort === 'recent' }" value="recent">Most Recent</li>-->
          <li
              class="option"
              :class="{'active':item.value === value}"
              v-for="(item,index) in options"
              :key="index"
              :value="item.value"
              @click="select(item.value)"
          >
            {{ item.label }}
          </li>
        </ol>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "select-component",
  props: {
    value: {
      type: [String, Number]
    },
    options: {
      type: Array
    }
  },
  computed: {
    conversion() {
      let item = this.options.find((i) => i.value === this.value)
      return item?.label ?? ''
    }
  },
  methods: {
    select(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="scss">
.ui8-select {
  -webkit-text-size-adjust: 100%;
  color: var(--mainFontColor);
  font: 400 13px/1.54 "jaf-bernino-sans", sans-serif;
  text-align: left;
  position: relative;
  display: inline-block;
  width: 100px;
  height: 34px;
  line-height: 34px;
  text-transform: capitalize;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  background: var(--selectBgColor);
  padding: 0 16px;
  min-width: initial;
  border-radius: 4px;
  font-size: 12px;
  box-sizing: border-box;
}

.ui8-select:hover .options-wrapper {
  display: block;

}

.active-option {
  position: relative;
  z-index: 10;
  display: inline-block;
  padding: 0 10px 0 0;
  font-size: 12px;
}

.triangle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.options-wrapper {
  display: none;
  font-size: 12px;
  background: transparent;
  padding-top: 10px;
  position: absolute;
  left: 0;
  top: 30px;
  width: 100%;
  box-sizing: content-box;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.options {
  margin: 0;
  bottom: auto;
  z-index: 10;
  font-size: 12px;
  background: #212121;
  padding: 8px 0;
  text-align: left;
  border-radius: 4px;
}

.option {
  list-style: none;
  cursor: pointer;
  color: var(--selectOpColor);
  padding: 0 16px;
}

.active {
  color: var(--selectActiveColor);
  font-weight: 600;
}

</style>
