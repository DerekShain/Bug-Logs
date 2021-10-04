<template>
  <div class="m-1 shadow rounded" v-if="(filter.status == 'Closed' && bug.closed) || (filter.status == 'Open' && !bug.closed)">
    <router-link :to="{name: 'Bug', params: {bugId: bug.id}}">
      <h6 class=" d-flex card-header row bg-danger text-light" v-if="bug.priority === 5">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-light">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-dark selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.createdAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
          <div v-if="bug.closed === true"
               class="bg-primary rounded"
          >
            Bug closed
            <i class="mdi mdi-check-decagram text-light"></i>
          </div>
          <div v-else
               class="
               bg-dark rounded"
          >
            Bug Open
          </div>
        </div>
      </h6>

      <h6 class=" d-flex card-header row bg-warning" v-if="bug.priority === 4">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-dark">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.createdAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
          <div v-if="bug.closed === true" class="bg-primary rounded text-light">
            Bug closed
            <i class="mdi mdi-check-decagram text-light"></i>
          </div>
          <div v-else
               class="
               bg-dark rounded text-light"
          >
            Bug Open
          </div>
        </div>
      </h6>

      <h6 class=" d-flex card-header row bg-info" v-if="bug.priority === 3">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-dark">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-dark selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.createdAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
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
      </h6>

      <h6 class=" d-flex card-header row bg-secondary" v-if="bug.priority === 2">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-dark">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-dark selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.createdAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
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
      </h6>

      <h6 class=" d-flex card-header row bg-dark text-light" v-if="bug.priority === 1">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-light">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.updatedAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
          <div v-if="bug.closed === true" class="bg-light text-dark rounded">
            Bug closed
            <i class="mdi mdi-check-decagram text-dark"></i>
          </div>
          <div v-else
               class="
               bg-success text-light rounded"
          >
            Bug Open
          </div>
        </div>
      </h6>
    </router-link>
  </div>
  <div class="m-1 shadow rounded" v-if="(filter.status == 'All')">
    <router-link :to="{name: 'Bug', params: {bugId: bug.id}}">
      <h6 class=" d-flex card-header row bg-danger text-light" v-if="bug.priority === 5">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-light">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-dark selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.createdAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
          <div v-if="bug.closed === true"
               class="bg-primary rounded"
          >
            Bug closed
            <i class="mdi mdi-check-decagram text-light"></i>
          </div>
          <div v-else
               class="
               bg-dark rounded"
          >
            Bug Open
          </div>
        </div>
      </h6>

      <h6 class=" d-flex card-header row bg-warning" v-if="bug.priority === 4">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-dark">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.createdAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
          <div v-if="bug.closed === true" class="bg-primary rounded text-light">
            Bug closed
            <i class="mdi mdi-check-decagram text-light"></i>
          </div>
          <div v-else
               class="
               bg-dark rounded text-light"
          >
            Bug Open
          </div>
        </div>
      </h6>

      <h6 class=" d-flex card-header row bg-info" v-if="bug.priority === 3">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-dark">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-dark selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.createdAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
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
      </h6>

      <h6 class=" d-flex card-header row bg-secondary" v-if="bug.priority === 2">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-dark">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-dark selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.createdAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
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
      </h6>

      <h6 class=" d-flex card-header row bg-dark text-light" v-if="bug.priority === 1">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-1 text-light">
          {{ bug.priority }}
        </div>
        <div class="col-4">
          {{ bug.creator.name }}
          <i v-if="account.id == bug.creatorId" class="mdi mdi-delete-sweep text-secondary selectable ps-3 f-15" aria-hidden="true" title="Delete Bug" @click="removeBug"></i>
        </div>
        <div class="col-2">
          {{ new Date(bug.updatedAt).toLocaleDateString() }}
        </div>
        <div class="col-2 text-center">
          <div v-if="bug.closed === true" class="bg-light text-dark rounded">
            Bug closed
            <i class="mdi mdi-check-decagram text-dark"></i>
          </div>
          <div v-else
               class="
               bg-success text-light rounded"
          >
            Bug Open
          </div>
        </div>
      </h6>
    </router-link>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      filter: computed(() => AppState.filter),
      async removeBug() {
        try {
          const yes = await Pop.confirm('Are you sure')
          if (!yes) { return }
          await bugsService.deleteBug(props.bug.id)
          Pop.toast('Complete!')
        } catch (error) {
          Pop.toast(error, 'error removing bug')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
