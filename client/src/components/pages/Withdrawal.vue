<template>
    <div class="page-wrapper">
        <div class="row" v-if="!submitted">
                <form @submit.prevent="send">
                    <div class="form-group">
                        <label>{{ $t("withdrawal.name") }}</label>
                        <input type="text" placeholder="Vor- und Nachname" class="form-control" v-model="name">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("withdrawal.orderId") }}</label>
                        <input type="text" placeholder="2024-42" class="form-control" v-model="orderId">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("withdrawal.email") }}</label>
                        <input type="email" placeholder="ihre@email.de" class="form-control" v-model="email">
                        <div class="alert alert-info">{{ $t("withdrawal.emailInfo") }}</div>
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
                            {{ $t("withdrawal.submit") }}
                        </button>
                    </div>
                </form>
              <div class="withdrawal-description" v-html="$t('withdrawal.description')"></div>
        </div>
        <div class="row" v-if="submitted">
            <div class="col-2"></div>
            <div class="col-8">
                <div class="alert alert-success">
                    {{ $t("withdrawal.sent") }}
                </div>
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
            name: "",
            orderId: "",
            email: "",
            website: "",
            challengeA: 0,
            challengeB: 0,
            challengeAnswer: "",
            submitted: false
        };
    },
    created() {
        this.generateChallenge();
        this.$emit("change-title", this.$t("withdrawal.title"));
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
                if (!this.name || !this.orderId || !this.email) {
                    return toastr.error(this.$t("general.error.missingInput"));
                }
                const expected = this.challengeA + this.challengeB;
                if (parseInt(this.challengeAnswer, 10) !== expected) {
                    this.generateChallenge();
                    return toastr.error(this.$t("general.error.mathChallenge"));
                }
                await HTTP().post("/withdrawal", {
                    name: this.name,
                    orderId: this.orderId,
                    email: this.email,
                    website: this.website,
                    challengeA: this.challengeA,
                    challengeB: this.challengeB,
                    challengeAnswer: this.challengeAnswer
                });
                this.submitted = true;
                toastr.success(this.$t("withdrawal.sent"));
            }
            catch (e) {
                console.error("[Withdrawal] Error on sending withdrawal email: ", e);
                toastr.error(this.$t("withdrawal.error.send"));
                this.generateChallenge();
            }
        }
    }
}
</script>

<style scoped>
.withdrawal-title {
    margin-bottom: 16px;
}
.withdrawal-description {
    margin-bottom: 32px;
  font-size: 14px;
}
.honeypot-field {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
}
</style>
