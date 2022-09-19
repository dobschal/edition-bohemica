<template>
    <div class="page-wrapper">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <form @submit.prevent="send" if="isNotSent">
                    <div class="form-group">
                        <label>{{ $t("general.sender") }}</label>
                        <input type="email" placeholder="ihre@email.de" class="form-control" v-model="email">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("general.title") }}</label>
                        <input type="text" placeholder="Ich habe eine Frage zu..." class="form-control" v-model="title">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("general.yourMessage") }}</label>
                        <textarea class="form-control" rows="7" v-model="message"></textarea>
                    </div>
                    <div class="form-group mt-4">
                        <!-- <vue-recaptcha sitekey="6LfMimwUAAAAAFHmKMcJ3ezGvMaG9uq6kLliVhaX">                            
                        </vue-recaptcha>                         -->
                        <button type="submit" class="btn btn-primary mt-4">
                            {{ $t("general.send") }}
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</template>

<script>

import { HTTP } from "../../util";
import toastr from "toastr";
import VueRecaptcha from 'vue-recaptcha';

export default {
    components: { VueRecaptcha },
    data() {
        return {
            title: "",
            message: "",
            email: "",
            isNotSent: true
        };
    },
    methods:
    {
        async send() {
            try {
                if (!this.title || !this.email) {
                    return toastr.error(this.$t("general.error.missingInput"));
                }
                // if (!grecaptcha.getResponse()) {
                //     return toastr.error(this.$t("general.captchaMessage"));
                // }
                const response = await HTTP().post("/contact", {
                    title: this.title,
                    message: this.message,
                    email: this.email
                    // captcha: grecaptcha.getResponse()
                });
                toastr.success(this.$t("contact.sent"));
                this.$router.push("/");
            }
            catch (e) {
                console.error("[Contact] Error on sending contact email: ", e);
                toastr.error(this.$t("contact.error.send"));
            }

        }
    }
}
</script>

