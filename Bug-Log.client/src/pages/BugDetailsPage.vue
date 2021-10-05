<template>
  <div class="row d-flex m-2 " v-if="bug.id">
    <div class="col-6">
      <div class="card">
        <div class="col card-header titleheader">
          <h5>{{ bug.title }}</h5>
          <div v-if="bug.priority===5" class="mx-4">
            <h6>
              Priority
              <i class="mdi mdi-numeric-5-box-multiple-outline f-18"></i>
            </h6>
          </div>
          <div v-if="bug.priority===4" class="mx-4">
            <h6>
              Priority
              <i class="mdi mdi-numeric-4-box-multiple-outline f-18"></i>
            </h6>
          </div>
          <div v-if="bug.priority===3" class="mx-4">
            <h6>
              Priority
              <i class="mdi mdi-numeric-3-box-multiple-outline f-18"></i>
            </h6>
          </div>
          <div v-if="bug.priority===2" class="mx-4">
            <h6>
              Priority
              <i class="mdi mdi-numeric-2-box-multiple-outline f-18"></i>
            </h6>
          </div>
          <div v-if="bug.priority===1" class="mx-4">
            <h6>
              Priority
              <i class="mdi mdi-numeric-1-box-multiple-outline f-18"></i>
            </h6>
          </div>

          <div v-if="bug.closed === true" class="bg-success text-light rounded">
            Bug closed
            <i class="mdi mdi-check-decagram text-light"></i>
          </div>
          <div v-else
               class="
               bg-dark text-light rounded"
          >
            Bug Open
          </div>
        </div>
        <div class="card-body" v-if="bug.creator">
          Created by
          <img :src="bug.creator.picture" class="rounded-circle" height="45" alt="">
          {{ bug.creator.name }}

          <br />

          Created on:  {{ new Date(bug.createdAt).toLocaleDateString() }} ,

          Last update: {{ new Date(bug.updatedAt).toLocaleDateString() }}
          <br />
          <p>
            {{ bug.description }}
          </p>
          <button type="button" v-if="bug.closed === false" class="btn btn-primary m-2" @click="trackBug()">
            Track
          </button>
          <button type="button" v-if="bug.closed === false" class="btn btn-primary m-2" @click="unTrackBug()">
            UnTrack
          </button>
          <button v-if="account.id == bug.creatorId && bug.closed === false" type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#edit-modal">
            Edit
          </button>
          <button v-if="account.id == bug.creatorId && bug.closed === false" type="button" class="btn btn-primary m-2" @click="toggleStatus(false)">
            Close
          </button><br />
          <p>
            Bug tracked by -
            <TrackedCard v-for="u in trackers" :tracked-bug="u" :key="u.id" class="m-2" />
          </p>
        </div>
      </div>
    </div>
    <div class="
                  col-6"
    >
      <div class="card">
        <h2 class="card-header">
          Notes
        </h2>
        <button type="button" v-if="bug.closed === false" class="btn btn-primary m-1 text-center" data-bs-toggle="modal" :data-bs-target="'#note-modal-'+bug.id">
          Add Note
        </button>
        <div class="card-body">
          <NoteCard v-for="n in notes" :note="n" :key="n.id" />
        </div>
      </div>
    </div>
  </div>
  <Modal :id="'note-modal-'+bug.id" class="text-light bg-dark">
    <template #modal-title>
      Create Note
    </template>
    <template #modal-body>
      <NoteForm :bug="bug" />
    </template>
  </Modal>
  <Modal id="edit-modal" class="text-light bg-dark">
    <template #modal-title>
      Edit Bug
    </template>
    <template #modal-body>
      <EditBugForm :bug="bug" />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { trackedService } from '../services/TrackedService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { router } from '../router'
export default {

  setup() {
    const route = useRoute()
    onMounted(() => {
      if (route.params.bugId || route.params.noteId) {
        bugsService.getBugById(route.params.bugId)
        notesService.getNoteByBugId(route.params.bugId)
        trackedService.getTrackersByBugId(route.params.bugId)
      }
    })
    return {
      bug: computed(() => AppState.bug),
      bugs: computed(() => AppState.bugs),
      notes: computed(() => AppState.notes),
      note: computed(() => AppState.note),
      account: computed(() => AppState.account),
      trackers: computed(() => AppState.trackers),
      async trackBug() {
        try {
          await trackedService.createTrackedBug(route.params.bugId)
          Pop.toast('Bug is Tracked!')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async unTrackBug() {
        try {
          for (let i = 0; i < AppState.trackers.length; i++) {
            const element = AppState.trackers[i]
            const trackedBug = AppState.trackers.filter(b => b.accountId !== element.accountId)
            await trackedService.deleteTrackedBug(trackedBug[0].id)
            Pop.toast('Closed!')
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async toggleStatus(status) {
        try {
          await bugsService.deleteBug(route.params.bugId, status)
          Pop.toast('Closed!')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

.titleheader{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
