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
                    <div class="honeypot-field" aria-hidden="true">
                        <label>Website</label>
                        <input type="text" tabindex="-1" autocomplete="off" v-model="website">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("general.mathChallenge", { a: challengeA, b: challengeB }) }}</label>
                        <input type="text" inputmode="numeric" class="form-control" v-model="challengeAnswer">
                    </div>
                    <div class="form-group mt-4">
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

export default {
    data() {
        return {
            title: "",
            message: "",
            email: "",
            website: "",
            challengeA: 0,
            challengeB: 0,
            challengeAnswer: "",
            isNotSent: true
        };
    },
    created() {
        this.generateChallenge();
    },
    methods:
    {
        generateChallenge() {
            this.challengeA = Math.floor(Math.random() * 9) + 1;
            this.challengeB = Math.floor(Math.random() * 9) + 1;
            this.challengeAnswer = "";
        },
        async send() {
            try {
                if (!this.title || !this.email) {
                    return toastr.error(this.$t("general.error.missingInput"));
                }
                const expected = this.challengeA + this.challengeB;
                if (parseInt(this.challengeAnswer, 10) !== expected) {
                    this.generateChallenge();
                    return toastr.error(this.$t("general.error.mathChallenge"));
                }
                const response = await HTTP().post("/contact", {
                    title: this.title,
                    message: this.message,
                    email: this.email,
                    website: this.website,
                    challengeA: this.challengeA,
                    challengeB: this.challengeB,
                    challengeAnswer: this.challengeAnswer
                });
                toastr.success(this.$t("contact.sent"));
                this.$router.push("/");
            }
            catch (e) {
                console.error("[Contact] Error on sending contact email: ", e);
                toastr.error(this.$t("contact.error.send"));
                this.generateChallenge();
            }

        }
    }
}
</script>

<style scoped>
.honeypot-field {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
}
</style>
