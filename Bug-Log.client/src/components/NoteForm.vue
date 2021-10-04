<template>
  <form @submit.prevent="createNote">
    <textarea class="form-control" type="text" placeholder="Message..." aria-label="default input example" v-model="editable.body">
      </textarea><br />
    <div class="form-group">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>
      <button type="submit" class="btn btn-primary">
        Add Bug
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { Modal } from 'bootstrap'
import { notesService } from '../services/NotesService'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createNote() {
        try {
          await notesService.createNote(editable.value)
          editable.value = {}
          Pop.toast('Bug Initialized', 'success')
          const modal = Modal.getInstance(document.getElementById('note-modal'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error('creation error', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
