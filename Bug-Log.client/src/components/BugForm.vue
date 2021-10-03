<template>
  <form @submit.prevent="createBug">
    <input class="form-control" type="text" placeholder="Title" aria-label="default input example" v-model="editable.title"><br />
    <input class="form-control"
           type="number"
           placeholder="Priority"
           aria-label="default input example"
           v-model="editable.priority"
           min="1"
           max="5"
    ><br />
    <textarea class="form-control" type="text" placeholder="Description" aria-label="default input example" v-model="editable.description">
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
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createBug() {
        try {
          await bugsService.createBug(editable.value)
          editable.value = {}
          Pop.toast('Noice!', 'success')
          const modal = Modal.getInstance(document.getElementById('bug-modal'))
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
