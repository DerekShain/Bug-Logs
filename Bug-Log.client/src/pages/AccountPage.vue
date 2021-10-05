<template>
  <div class="home flex-grow-1 mt-5 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-dark text-light rounded elevation-3">
      <div class="text-center">
        <img src="../assets/img/bpl.png" alt="Bug" class="">
        <p class="text-center">
          <button class="btn btn-primary m-1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
          >
            Welcome to your tracked bugs!
          </button>
        </p>
      </div>
      <div class="collapse" id="collapseExample">
        <div class="card card-body bg-primary text-light">
          <div class="row d-flex m-3 align-items-center ">
            <div class="col-2">
              Bug Title
            </div>
            <div class="col-2">
              Priority
            </div>

            <div class="col-2">
              Last Update
            </div>
            <div class="col-2">
              <div class="d-flex">
                <div class="dropdown me-1">
                  <button type="button"
                          class="btn btn-secondary dropdown-toggle"
                          id="dropdownMenuOffset"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          data-bs-offset="10,20"
                  >
                    Bug Status
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                    <li><a class="dropdown-item Selectable" @click="filter('All')">All</a></li>
                    <li><a class="dropdown-item selectable" @click="filter('Open')">Open</a></li>
                    <li><a class="dropdown-item selectable" @click="filter('Closed')">Closed</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <TrackedBugCard v-for="b in trackers" :bug="b.bug" :key="b.id" />
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
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { TrackedBug } from '../models/TrackedBug'
import { trackedService } from '../services/TrackedService'

export default {
  name: 'Account',
  filtered: [],
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const high = ref(true)
    const low = ref(false)
    const route = useRoute()
    // debugger
    onMounted(async() => {
      try {
        await bugsService.getBugs()
        trackedService.getTrackedBugById()
      } catch (error) {
        Pop.toast(error, 'error')
        logger.error('error grabbing bugs on bugspage', error)
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
      bug: computed(() => AppState.bug),
      trackers: computed(() => AppState.trackers),
      filter(filter) {
        AppState.filter.status = filter
      }
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
