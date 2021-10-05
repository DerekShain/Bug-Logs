<template>
  <form @submit.prevent="createNote">
    <textarea class="form-control" type="text" placeholder="Message..." aria-label="default input example" v-model="editable.body">
      </textarea><br />
    <div class="form-group">
      <button type="button" class="btn btn-secondary m-2" data-bs-dismiss="modal">
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
import { useRoute } from 'vue-router'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      route,
      async createNote() {
        try {
          editable.value.bugId = route.params.bugId
          await notesService.createNote(editable.value)
          editable.value = {}
          Pop.toast('Note Created', 'success')
          const modal = Modal.getInstance(document.getElementById('note-modal-' + route.params.bugId))
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
