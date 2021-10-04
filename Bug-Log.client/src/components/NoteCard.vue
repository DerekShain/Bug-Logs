<template>
  <div class="card m-2">
    <div class="card-body">
      {{ note.body }}
      <div class="col-4">
        <i v-if="account.id == note.creatorId" class="mdi mdi-delete-sweep text-dark selectable ps-3 f-18" aria-hidden="true" title="Delete Bug" @click="removeNote"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      bugs: computed(() => AppState.bugs),
      async removeNote() {
        try {
          const yes = await Pop.confirm('Are you sure?')
          if (!yes) { return }
          await notesService.deleteNote(props.note.id)
          Pop.toast('Complete')
        } catch (error) {
          Pop.toast(error, 'Problem deleting')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
