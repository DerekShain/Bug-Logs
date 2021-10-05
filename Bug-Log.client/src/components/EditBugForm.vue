<template>
  <form @submit="createBug">
    <input class="form-control text-dark" type="text" placeholder="Title" aria-label="default input example" v-model="editable.title"><br />
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
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { Modal } from 'bootstrap'
import { router } from '../router'
import { useRoute } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import { Bug } from '../models/Bug'
export default {
  props: {
    bug: {
      type: Bug,
      default: () => new Bug()
    }
  },
  setup(props) {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.bug }
    })
    const route = useRoute()
    return {
      editable,
      async createBug() {
        try {
          if (editable.value.id) {
            await bugsService.editBug(editable.value)
          } else {
            await bugsService.editBug(editable.value)
            editable.value = {}
          }
          Pop.toast('Bug Initialized', 'success')
          const modal = Modal.getInstance(document.getElementById('edit-modal'))
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
