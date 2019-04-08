<template>
  <section>
    <form action="">
      <b-field label="New password:">
        <b-input
          v-model="new_password"
          type="password"
          placeholder="E-mail address"
          required>
        </b-input>
      </b-field>

      <b-field label="New password:">
        <b-input
          v-model="re_new_password"
          type="password"
          placeholder="E-mail address"
          required>
        </b-input>
      </b-field>
      <button class="button is-primary" v-on:click="passwordResetConfirm()">
        Change password
      </button>
    </form>
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
