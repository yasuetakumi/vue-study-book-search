<template>
    <div>
        <v-skeleton-loader v-if="loadingComponent" type="card-avatar, article, actions"> </v-skeleton-loader>
        <v-sheet v-if="!loadingComponent" elevation="1" min-height="70vh" width="100%" :rounded="'sm'">
            <GBackButton :targetRoute="{ name:'customers' }">
            </GBackButton>
            <v-container class="pr-10 pl-10 pl-lg-0">
                <v-row>
                    <v-col cols="12" lg="10">
                        <v-form ref="customerForm" @submit.prevent="submit">
                            <g-input-group required :title="$t('general.name')">
                                <v-text-field
                                :rules="rules.name"
                                :placeholder="$t('general.name')"
                                outlined
                                v-model="item.name"
                                ></v-text-field>
                            </g-input-group>
                            <div class="pt-10">
                                <v-btn type="submit">{{ $t('general.crud.submit') }}</v-btn>
                            </div>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </div>
</template>
<script>
import { store, getForm, update } from '@services/crud';
import GInputGroup from '@components/form_input/GInputGroup.vue';
import GBackButton from '@components/GBackButton.vue';
export default {
    data() {
        return {
            rules: {
                name: [v => !!v || 'Name is required'],
            },
            item: {
                id: null,
                name: '',
            },
            editPage: false,
            submitUrl: '',
            loadingComponent: false,
        };
    },
    methods: {
        async submit() {
            if (this.$refs.customerForm.validate()) {
                let options = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };
                let payload = new FormData();
                payload.append('name', this.item.name);
                const res = this.editPage
                ? await update(this.submitUrl, payload, options)
                : await store(this.submitUrl, payload, options);
                if (res) {
                    this.$router.push({ name: 'customers' });
                }
            }
        },
    },
    async created() {
        this.loadingComponent = true;
        try {
            const form = await getForm(this.$route.path);
            if (this.$route.meta.editPage) {
                this.editPage = true;
                let { submitUrl, item } = form;
                this.item = item;
                this.submitUrl = submitUrl;
            } else {
                let { submitUrl } = form;
                this.submitUrl = submitUrl;
            }
        } catch (err) {
            console.log(err);
        }
        this.loadingComponent = false;
    },
    components: {
        GInputGroup,
        GBackButton,
    },
};
</script>
