<template>
    <div class="page-wrapper">
        <div class="row">
            <div class="col-12">
                <ul class="list-group">
                    <li class="list-group-item" v-for="porto in portos" :key="porto._id">
                        <div class="row">
                            <div class="col-sm-3">{{ porto.name }}</div>
                            <div class="col-sm-2">{{ porto.weightFrom }}g</div>
                            <div class="col-sm-1"> < </div>
                            <div class="col-sm-2">{{ porto.weightUpTo }}g</div>
                            <div class="col-sm-2">
                                <span class="float-right">
                                    {{ porto.price | price }}
                                </span>
                            </div>
                            <div class="col-sm-2">
                                <div v-tooltip="$t('general.delete')" class="button-remove float-right" @click="removePorto(porto._id)"></div>
                            </div>
                        </div>
                    </li>
                     <li class="list-group-item list-group-item-light">
                        <div class="row">
                            <div class="col-sm-12 mb-2">
                                <b>Neue Versandkosten eintragen <small>(Gewicht in Gramm angeben)</small></b>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <input type="text" v-model="name" class="form-control" placeholder="Name">
                            </div>
                            <div class="col-sm-3">
                                <input type="text" v-model="weightFrom" class="form-control" placeholder="Min. Gewicht">
                            </div>
                            <div class="col-sm-3">
                                <input type="text" v-model="weightUpTo" class="form-control" placeholder="Max. Gewicht">                            
                            </div>
                            <div class="col-sm-2">
                                <input type="text" v-model="price" class="form-control" placeholder="Preis">
                            </div>
                            <div class="col-sm-2">
                                <div v-tooltip="$t('general.save')" class="button-add float-right" @click="addPorto">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>                
            </div>
        </div>
    </div>
</template>

<script>

import { HTTP } from "../../../util";
import toastr from "toastr";

export default {
    data()
    {
        return {
            portos: [],
            name: "",
            weightFrom: "",
            weightUpTo: "",
            price: ""
        };
    },
    created()
    {
        this.load();
        this.$emit("change-title", this.$t("backend.porto.title") );
    },
    methods:
    {
        async load()
        {
            try
            {
                const response = await HTTP().get(`/porto`);
                this.portos = response.data;
            }
            catch(e)
            {
                console.error("[Porto] Unable to load porto", e);
                toastr.error( this.$t("general.error.load") );
            }
        },
        async removePorto( id )
        {
            try
            {
                const response = await HTTP().delete(`/porto/${id}`);
                this.load();
                toastr.success( this.$t("general.deleteSuccessful") );
            }
            catch(e)
            {
                console.error("[Porto] Unable to delete porto.", e);   
                toastr.error( this.$t("general.error.delete") );
            }
        },
        async addPorto()
        {
            try
            {
                const porto = {
                    name: this.name, 
                    weightFrom: parseInt( this.weightFrom ),
                    weightUpTo: parseInt( this.weightUpTo ),
                    price: parseFloat( (this.price + "").replace(",", ".") ),
                    countryCode: "DE"
                };
                const response = await HTTP().post(`/porto`, porto );
                this.load();
                toastr.success( this.$t("general.saveSuccessful") );
            }
            catch(e)
            {
                console.error("[Porto] Unable to save porto.", e);   
                toastr.error( this.$t("general.error.save") );
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../../styles/variables.scss";

.button-remove
{
    @include iconButton( "../../../assets/button-remove.svg" );
}

.button-add
{
    @include iconButton( "../../../assets/button-add.svg" );
}

</style>

