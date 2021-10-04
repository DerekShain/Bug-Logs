<template>
  <BugCard v-for="b in filtered" :filtered="b" :key="b.id" />
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      bug: computed(() => AppState.bug),
      sort: computed(() => AppState.sort)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
