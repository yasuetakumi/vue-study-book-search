<template>
    <PageInnerset :title="$t('general.customers.list')">
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

        <!--for filter column -->
        <v-container fluid class="grey lighten-5 mb-6">
            <v-row no-gutters justify="space-between">
                <v-col xl="12" lg="12" md="12" sm="12">
                <v-btn
                    depressed
                    color="primary"
                    @click.stop="dialogColumnFilter = true"
                    class="float-none float-sm-right"
                >
                    Filter Column
                </v-btn>
                <v-dialog
                    v-model="dialogColumnFilter"
                    max-width="700"
                >
                    <v-card>
                    <v-card-title class="text-h5">
                        Column Fillter
                    </v-card-title>
                    <v-card-text>
                        <v-container fluid>
                        <v-row>
                            <v-col sm="12" md="7" xl="7">
                            <v-text-field
                                label="Search Column Name . . ."
                                v-model="searchNameColumn"
                                solo
                            ></v-text-field>
                            </v-col>
                            <v-col sm="12" md="5" xl="5" class="d-flex justify-space-between pt-4">
                            <v-btn
                                large
                                color=""
                                @click="displayColumn(true)"
                            >
                                Show All
                            </v-btn>
                            <v-btn
                                large
                                color=""
                                @click="displayColumn(false)"
                            >
                                Hide All
                            </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                            v-for="(header, index) in resultSearchNameColumn"
                            :key="index"
                            xl="4"
                            lg="4"
                            md="3"
                            >
                            <v-btn
                                class=""
                                block
                                :outlined="!header.status"
                                color="cyan"
                                dark
                                @click="filterColumn(header)"
                            >
                                {{ header.text }}
                            </v-btn>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                        color=""
                        @click="dialogColumnFilter = false"
                        >
                        close
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
                </v-col>
            </v-row>
        </v-container>

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
                    <td v-show="isEnabledColumn('name')">
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
                    <td v-show="isEnabledColumn('action')" colspan="4"></td>
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
    </PageInnerset>
</template>

<script>
import io from 'lodash';
import { destroy, getAll } from '@services/crud';
import { convArrToObj } from '@helpers';
import PageInnerset from '../../_components/page/PageInnerset';
import GActionButton from '../../_components/GActionButton.vue';

import FilterReset from '@views/_components/datatable_filter/TableFilterReset';
import FilterContainer from '@views/_components/datatable_filter/TableFilterContainer';

import FilterText from '@views/_components/datatable_filter/TableFilterText';
import { mapState } from 'vuex'
import { pushNotif } from '@/helpers';

export default {
    components: { 
        PageInnerset,
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

            // init table header
            headersMap: [
                {
                    text: 'ID',
                    value: 'id',  
                    status: true,
                },
                {
                    text: this.$t('general.name'),
                    value: 'name',
                    status: true,
                },
                {
                    text: this.$t('general.auth.email'),
                    value: 'email',
                    status: true,
                },
                {
                    text: this.$t('general.phone_number'),
                    value: 'phone',
                    status: true,
                },
                {
                    text: this.$t('general.website'),
                    value: 'website',
                    status: true,
                },
                {
                    text: this.$t('general.crud.action'),
                    value: 'action',
                    sortable: false,
                    status: true,
                },
            ],
            selectedHeaders: [],
            // --- END for filter column
        }
    },
    created () {
        var query = this.$route.query;
        this.activeFilters = io.assign({}, this.defaultFilters, query );

        this.selectedHeaders = this.headersMap;
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
        // --- changefor filter column
        headers: {
            // getter
            get: function () {
                return this.selectedHeaders.filter(s => s.status == true);
            },
            // setter
            set: function () {
                // 
            }
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
        // --- for filter column
        resultSearchNameColumn(){
            return this.selectedHeaders.filter((item)=>{
                return item.text.toLowerCase().includes(this.searchNameColumn.toLowerCase());
            });
        },
        ...mapState({
        // for get current locale
            currentLocale: state => state.global.locale,
        }),
        // --- END for filter column
    },
    mounted() {
        this.getAllCustomers();
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
                        pushNotif(this.$t('general.customers.deleteSuccess'), 'success');
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

         // --- for filter column
        filterColumn: function(data) {
            // find index data
            let index = this.selectedHeaders.findIndex((obj => obj.value == data.value));
            // change status
            this.selectedHeaders[index].status = !data.status;
            // change headers, only shows if status == true
            this.headers = this.selectedHeaders.filter(function(value){ 
                return value.status == true;
            });
        },
        // for hide select filter if table header is hidden
        isEnabledColumn: function(value) {
            let obj_selectedHeaders = this.selectedHeaders.find(obj => obj.value == value);
            return obj_selectedHeaders.status;
        },
        // for change word based on local (on table header and dialog filter column)
        changeTextFromLocal: function() {
            this.selectedHeaders = this.selectedHeaders.map(obj => {
                // temporary object
                var temp = Object.assign({}, obj);
                if(temp.value != 'id') {
                    switch (temp.value) {
                        case 'name':
                            temp.text = this.$t('general.name');
                            break;
                        case 'email':
                        temp.text = this.$t('general.auth.email');
                            break;
                            case 'phone':
                        temp.text = this.$t('general.phone_number');
                            break;
                            case 'website':
                        temp.text = this.$t('general.website');
                            break;
                            case 'action':
                        temp.text = this.$t('general.crud.action');
                            break;
                        default:
                            console.log('no data');
                    }
                }
                return temp;
            });
        },
        displayColumn: function(type) {
            for (let index = 0; index < this.selectedHeaders.length; index++) {
                this.selectedHeaders[index].status = type;
            }
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
