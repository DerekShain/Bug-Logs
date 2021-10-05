<template>
  <img :src="trackedBug.tracker.picture" class="rounded-circle" height="45" alt="" :title="trackedBug.tracker.name">
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    trackedBug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
