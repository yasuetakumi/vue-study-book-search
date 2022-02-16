<template>
    <v-sheet>
        <v-form ref="customerFilter" @submit.prevent="submit" lazy-validation class="px-10 mb-0">
            <!-- Reset Button -->
            <FilterReset  @click="resetFilter()"></FilterReset>

            <!-- Filter Container -->
            <FilterContainer>
                <template v-slot:left>
                    <!-- Name Filter -->
                    <FilterText
                    :title="$t('general.name')+ ': '"
                    :partial="true"
                    v-model="activeFilters.name"
                    />
                    
                    <!-- Email Filter -->
                    <FilterText
                    :title="$t('general.auth.email')+ ': '"
                    :partial="true"
                    v-model="activeFilters.email"
                    />
                </template>
                <template v-slot:right>
                    <!-- Phone Filter -->
                    <FilterText
                    :title="$t('general.phone_number')+ ': '"
                    :partial="true"
                    v-model="activeFilters.phone"
                    />

                    <!-- Website Filter -->
                    <FilterText
                    :title="$t('general.website')+ ': '"
                    :partial="true"
                    v-model="activeFilters.website"
                    />
                </template>
            </FilterContainer>
        </v-form>

        <!-- Datatable -->
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
                    <td>
                        <v-text-field v-model="activeFilters.email"></v-text-field>
                    </td>
                    <td>
                        <v-text-field v-model="activeFilters.phone"></v-text-field>
                    </td>
                    <td>
                        <v-text-field v-model="activeFilters.website"></v-text-field>
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
    </v-sheet>
</template>

<script>
import io from 'lodash';
import { destroy, getAll } from '@services/crud';
import { convArrToObj } from '@helpers';
import GActionButton from '../../_components/GActionButton.vue';

import FilterReset from '@views/_components/datatable_filter/TableFilterReset';
import FilterContainer from '@views/_components/datatable_filter/TableFilterContainer';

import FilterText from '@views/_components/datatable_filter/TableFilterText';

export default {
    components: { 
        GActionButton,
        FilterReset,
        FilterContainer,
        FilterText,
    },
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
            // --- for filter column
            searchNameColumn: '',
            dialogColumnFilter: false,
            
            defaultFilters: {
                name: '',
                email:'',
                phone: '',
                website: '',
            },
        }
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
        defaultFilters: {
            handler(to){
                console.log(to);
            },
            deep: true,
        },
        // --- for filter column
        currentLocale: function () {
            this.changeTextFromLocal();
        },
        // --- END for filter column

        $route: {
            immediate: true,
            deep: true,
            handler(){
                this.getAllCustomers();
            }
        }
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
                    text: this.$t('general.auth.email'),
                    value: 'email',
                },
                {
                    text: this.$t('general.phone_number'),
                    value: 'phone',
                },
                {
                    text: this.$t('general.website'),
                    value: 'website',
                },
                {
                    text: this.$t('general.crud.action'),
                    value: 'action',
                    sortable: false,
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
    
    created() {
        var query = this.$route.query;

        this.activeFilters = io.assign({}, this.defaultFilters, query );
    },

    methods: {
        // update and push filter into vue router
        updateFilters: io.throttle( function() {
            const filters = io.cloneDeep( this.activeFilters );
            const keys = Object.keys(filters);

            keys.forEach((key, index) => {
                if(!String(filters[key])) delete filters[key];;
            });

            this.$router.push({  query: filters }).catch( function(e){});
        }, 500),

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

        resetFilter: function() {
            this.$refs.customerFilter.reset;
            this.activeFilters = io.cloneDeep( this.defaultFilters );;
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
