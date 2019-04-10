<template>
<section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">

<div class="columns is-mobile">
  <div class="column is-4 is-offset-4">

      <div class="field">
        <label class="label is-small">Password</label>
        <p class="control has-icons-left">
          <input v-model="password" type="password" class="input" required>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <label class="label is-small">Password</label>
        <p class="control has-icons-left">
          <input v-model="password" type="password" class="input" required>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>


</div>
</div>

    </div>
  </div>
</section>
</template>

<script>
  import { AUTH_PASSWORD_RESET_CONFIRM } from '@/store/actions/auth';

  export default {
    name: 'PasswordResetConfirm',
    components: {
    },
    data() {
      return {
        new_password: "",
        re_new_password: "",
      }
    },
    methods: {
      passwordResetConfirm: function() {
        if(this.new_password && this.re_new_password) {
          this.$store.dispatch(AUTH_PASSWORD_RESET_CONFIRM, {
            uid: this.$route.params.uid,
            token: this.$route.params.token,
            new_password: this.new_password,
            re_new_password: this.re_new_password
          }).then(() => {
//            this.$router.push('/');
          })
        }
      }
    }
  }
</script>
