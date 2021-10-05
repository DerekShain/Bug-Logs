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
            Bug List
          </button>
          <button type="button" class="btn btn-primary m-1 text-center" data-bs-toggle="modal" data-bs-target="#bug-modal">
            Add Bug
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
              <button class="btn selectable me-2 text-white" @click="togglePriority">
                <i class="mdi mdi-chevron-up-circle text-light" v-if="high"></i>
                <i class="mdi mdi-chevron-down-circle text-warning" v-else></i>
              </button>
            </div>
            <div class="col-4">
              Creator
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
          <BugCard v-for="b in bugs" :bug="b" :key="b.id" />
        </div>
      </div>

      <Modal id="bug-modal" class="text-light bg-dark">
        <template #modal-title>
          <h4>
            Create Bug
          </h4>
        </template>
        <template #modal-body>
          <BugForm />
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

import { notesService } from '../services/NotesService'
import { trackedService } from '../services/TrackedService'
import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  filtered: [],
  setup() {
    const high = ref(true)
    const low = ref(false)
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getBugs()
        trackedService.getTrackersByBugId(route.params.bugId)
        // await notesService.getNotes()
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
