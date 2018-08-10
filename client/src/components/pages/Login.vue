<template>

    <form @submit.prevent="login">
        <div class="form-group">
            <label>{{ $t("general.username") }}</label>
            <input class="form-control" type="text" placeholder="Ein Name" v-model="username">
        </div>
        <div class="form-group">
            <label>{{ $t("general.password") }}</label>
            <input class="form-control" type="password" placeholder="beispiel" v-model="password">
        </div>
        <button type="submit" class="btn btn-success">{{ $t("general.login") }}</button>
    </form>
</template>

<script>

import { HTTP } from "../../util";
import toastr from "toastr";

export default {
    data()
    {
        return {
            username: "",
            password: "",
            errors: []
        };
    },
    mounted()
    {
        this.$emit("change-title", this.$t("login.title") );
    },
    methods: {
        login()
        {
            HTTP.post("/login", {
                username: this.username,
                password: this.password
            }).then( response => {
                const { token } = response.data;
                console.log("[Login] Token: ", token);
                this.$store.commit("storeToken", token);
                toastr.success( this.$t("login.success") );
                this.$router.push("/admin");
            }).catch( error => {
                console.warn("[Login] Error: ", error );
                this.errors.push( this.$t("login.error") );
            });
        }
    }
}
</script>
