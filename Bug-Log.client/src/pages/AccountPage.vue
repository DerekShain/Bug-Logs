<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-white rounded elevation-3">
      <div class="text-center">
        Welcome {{ account.name }}<br />
        <img src="../assets/img/bpl.png" alt="Bug" class="">
        <p class="text-center">
          <button class="btn btn-primary m-1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
          >
            Bug List
          </button>
          <button type="button" class="btn btn-primary m-1 text-center" data-bs-toggle="modal" data-bs-target="#bug-modal">
            Add Bug
          </button>
        </p>
      </div>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <div class="row d-flex">
            <div class="col-2">
              Bug Title
            </div>
            <div class="col-2">
              Priority
              <button class="btn selectable me-2 text-white" @click="togglePriority">
                <i class="mdi mdi-chevron-up-circle text-primary" v-if="high"></i>
                <i class="mdi mdi-chevron-down-circle text-secondary" v-else></i>
              </button>
            </div>
            <div class="col-4">
              Creator
            </div>
            <div class="col-2">
              Last Update
            </div>
            <div class="col-2">
              Status
            </div>
          </div>
          <BugCard v-for="b in bugs" :key="b.id" :bug="b" />
        </div>
      </div>
    </div>
  </div>

  <Modal id="bug-modal">
    <template #modal-title>
      Create Bug
    </template>
    <template #modal-body>
      <BugForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'

export default {
  name: 'Account',
  setup() {
    const high = ref(true)
    const low = ref(false)
    const route = useRoute()

    async function getBugs() {
      try {
        await bugsService.getBugs({ creatorId: route.params.id })
      } catch (error) {
        Pop.toast(error, 'Error')
        logger.error('error grabbin bugs')
      }
    }
    watchEffect(async() => {
      if (route.params.id) {
        await bugsService.getBugById(route.params.id)
        getBugs()
      }
    })

    function lowFilter(b) {
      if (low.value) {
        return b.priority > 2
      }
      return true
    }
    function highfilter(a, b) {
      if (high.value) {
        return b.priority - a.priority
      }
      return a.priority - b.priority
    }
    return {
      high,
      low,
      togglePriority() {
        high.value = !high.value
      },
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs.filter(lowFilter).sort(highfilter)),
      bug: computed(() => AppState.bug)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  // display: grid;
  // height: 80vh;
  place-content: center;
  // text-align: center;
  // user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
