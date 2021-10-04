<template>
  <div class="component">
    {{ bug.creator.id }}
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
