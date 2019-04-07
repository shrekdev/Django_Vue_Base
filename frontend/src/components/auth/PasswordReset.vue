<template>
    <section>
        <button class="button is-primary"
            @click="isComponentModalActive = true">
            Password reset
        </button>

        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <modal-form v-bind="formProps"></modal-form>
        </b-modal>
    </section>
</template>

<script>
  const ModalForm = {
    props: ['email'],
    template: `
      <form action="">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Password reset</p>
          </header>
          <section class="modal-card-body">
            <b-field label="E-mail">
              <b-input
                type="email"
                :value="email"
                placeholder="Your email"
                required>
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary">Reset password</button>
          </footer>
        </div>
      </form>
    `
  }

  export default {
    name: 'PasswordReset',
    components: {
      ModalForm
    },
    data() {
      return {
        isComponentModalActive: false,
        formProps: {
          email: '',
        }
      }
    },
  }
</script>
