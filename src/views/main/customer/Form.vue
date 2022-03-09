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
                            <g-input-group required :title="$t('general.auth.email')">
                                <v-text-field
                                :rules="rules.email"
                                :placeholder="$t('general.auth.email')"
                                outlined
                                v-model="item.email"
                                ></v-text-field>
                            </g-input-group>
                            <g-input-group required :title="$t('general.phone_number')">
                                <v-text-field
                                :rules="rules.phone"
                                :placeholder="$t('general.phone_number')"
                                outlined
                                v-model="item.phone"
                                ></v-text-field>
                            </g-input-group>
                            <g-input-group required :title="$t('general.website')">
                                <v-text-field
                                :rules="rules.website"
                                :placeholder="$t('general.website')"
                                outlined
                                v-model="item.website"
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
import { pushNotif } from '@/helpers';

export default {
    data() {
        return {
            rules: {
                name: [v => !!v || 'Name is required'],
                email: [v => !!v || 'Email Address is required'],
                phone: [v => !!v || 'Phone Number is required'],
                website: [v => !!v || 'Website is required'],
            },
            item: {
                id: null,
                name: '',
                email: '',
                phone:'',
                website: '',
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
                payload.append('email', this.item.email);
                payload.append('phone', this.item.phone);
                payload.append('website', this.item.website);
                const res = this.editPage
                ? await update(this.submitUrl, payload, options)
                : await store(this.submitUrl, payload, options);
                if (res) {
                    // Notif Message when success store or updated data
                    pushNotif(this.$t('general.customers.createSuccess', {customer: this.item.name}), 'success');
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
