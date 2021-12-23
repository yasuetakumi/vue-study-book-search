<template>
    <v-data-table
    :headers="headers"
    :items="displayedCustomers"
    :options.sync="options"
    :server-items-length="totalCustomers"
    :loading="loading"
    class="elevation-1"
    >
    <template v-slot:body.prepend>
        <tr>
            <td></td>
            <td>
                <v-text-field v-model="activeFilters.name"></v-text-field>
            </td>
            <td colspan="4"></td>
        </tr>
    </template>
    <template v-slot:item.action="{ item }">
        <v-btn
        :disabled="loading"
        color="cyan darken-2"
        small
        :class="[$vuetify.breakpoint.lgAndDown ? 'my-1' : '', 'mx-2 white--text']"
        @click="editCustomer(item.id)"
        >
        <v-icon>mdi-account-edit</v-icon>
    </v-btn>
    <g-action-button
    :disabled="loading"
    :onConfirm="deleteCustomer(item.id)"
    :btnClass="[$vuetify.breakpoint.lgAndDown ? 'my-1' : '', 'mx-2 white--text']"
    color="grey darken-2"
    ></g-action-button>
</template>
</v-data-table>
</template>

<script>
import { destroy, getAll } from '@services/crud';
import { convArrToObj } from '@helpers';
import GActionButton from '../../_components/GActionButton.vue';

export default {
    components: { GActionButton },
    data() {
        return {
            formData: {},
            totalCustomers: 0,
            customers: [],
            loading: true,
            options: {
                groupBy: [],
                groupDesc: [],
                itemsPerPage: 10,
                multiSort: false,
                mustSort: false,
                page: 1,
                sortBy: [],
                sortDesc: [],
            },
            activeFilters: {},
        };
    },
    computed: {
        headers() {
            return [
                {
                    text: 'ID',
                    value: 'id',
                },
                {
                    text: this.$t('general.name'),
                    value: 'name',
                },
                {
                    text: this.$t('general.crud.action'),
                    value: 'action',
                },
            ]
        },
        displayedCustomers() {
            return this.customers.map(customer => ({
                ...customer,
            }));
        },
        keyedFormData() {
            let obj = {};
            for (const [key, value] of Object.entries(this.formData)) {
                obj[key] = convArrToObj(value, 'id');
            }
            return obj;
        },
    },
    watch: {
        options: {
            handler() {
                this.getAllCustomers();
            },
            deep: true,
        },
        activeFilters: {
            handler() {
                this.getAllCustomers();
            },
            deep: true,
        },
    },
    mounted() {
        this.getAllCustomers();
    },
    methods: {
        getAllCustomers: async function() {
            try {
                let url = 'customers';
                this.loading = true;
                const { itemsPerPage, page, sortBy, sortDesc } = this.options;
                const res = await getAll(url, {
                    itemsPerPage,
                    page,
                    sortBy,
                    sortDesc,
                    ...this.activeFilters,
                });
                this.customers = res.customers.data;
                this.totalCustomers = res.customers.total;
                this.formData = res.formData;
            } catch (err) {
                console.log(err);
            } finally {
                this.loading = false;
            }
        },
        deleteCustomer: function(id) {
            let cb = async function() {
                try {
                    this.loading = true;
                    let url = `customers/${id}`;
                    const res = await destroy(url);
                    if (res) {
                        this.getAllCustomers();
                    }
                } catch (err) {
                    if (err.isHandled) {
                        //
                    }
                } finally {
                    this.loading = false;
                }
            };

            return cb.bind(this);
        },
        editCustomer: function(id) {
            this.$router.push({ name: 'customers.edit', params: { id } });
        },
    },
};
</script>
<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-weight: bold !important;
    font-size: 18px !important;
    white-space: nowrap;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    font-size: 14px !important;
}
</style>
