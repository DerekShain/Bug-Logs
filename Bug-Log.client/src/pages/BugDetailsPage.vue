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
          <button type="button" class="btn btn-primary" @click.prevent="trackBug()">
            Track
          </button>
          <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#edit-modal">
            Edit
          </button>
          <button type="button" class="btn btn-primary m-2" @click="toggleStatus">
            Close
          </button>
          <TrackedCard v-for="t in trackedbugs" :trackedbug="t" :key="t.id">
          </trackedcard>
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
        <button type="button" class="btn btn-primary m-1 text-center" data-bs-toggle="modal" :data-bs-target="'#note-modal-'+bug.id">
          Add Note
        </button>
        <div class="card-body">
          <NoteCard v-for="n in notes" :note="n" :key="n.id" />
        </div>
      </div>
    </div>
  </div>
  <Modal :id="'note-modal-'+bug.id">
    <template #modal-title>
      Create Note
    </template>
    <template #modal-body>
      <NoteForm :bug="bug" />
    </template>
  </Modal>
  <Modal id="edit-modal">
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
export default {

  setup() {
    const route = useRoute()
    onMounted(() => {
      if (route.params.bugId || route.params.noteId) {
        bugsService.getBugById(route.params.bugId)
        // notesService.getNoteById(route.params.noteId)
        notesService.getNoteByBugId(route.params.bugId)
      }
    })
    return {
      bug: computed(() => AppState.bug),
      bugs: computed(() => AppState.bugs),
      notes: computed(() => AppState.notes),
      note: computed(() => AppState.note),
      account: computed(() => AppState.account),
      async trackBug() {
        try {
          await trackedService.createTrackedBug()
        } catch (error) {
          Pop.toast(error.messag, 'error')
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
