<!-- <template>
  <div id="app">
  <v-app id="inspire">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  追加
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
    
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.name"
                          label="Dessert name"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.calories"
                          label="Calories"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.fat"
                          label="Fat (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.carbs"
                          label="Carbs (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.protein"
                          label="Protein (g)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
    
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <div>データなし</div>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</div>
</template>

<script>

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'name', value: 'name' },
      { text: 'email', value: 'email' },
      { text: 'created_at', value: 'created_at' },
      { text: 'updated_at', value: 'updated_at' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  mounted() {
    this.axios.get('/table').then((res) => {
      this.desserts = res.data;
      console.log(this.desserts);
    })
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style>
  table {
    border: solid 1px #ccc;
    border-collapse:collapse;
  }
  th {
    padding: 5px;
    border: solid 1px #ccc;
    background-color: #eee;
  }
  td {
    padding: 5px;
    border: solid 1px #ccc;
  }
</style> -->


<template>
  <div>
    
    <div>
      <v-row>
        <v-col cols="6">
          <v-btn class="primary" to="/search">検索する</v-btn>
          <v-btn color="error" @click="deleteLocalStorage">削除する</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" v-for="book in books" :key="book.id">
          <v-card>
            <v-row>
              <v-col cols="4">
                <v-img :src="book.image"></v-img>
              </v-col>
              <v-col cols="8">
                <v-card-title>
                  {{book.title}}
                </v-card-title>
                読んだ日:{{book.readDate}}
                感想:{{book.memo}}
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn :to="{name: 'edit', params: {id: book.id}}" color="indigo" fab small dark>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  const STORAGE_KEY = 'books';
  export default{
    props:{
      books:Array
    },
    methods: {
      async search(keyword){
        this.searchResults = []
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
        const params = {
          q: `intitle:${keyword}`,
          maxResults:40
        }
        const queryParams = new URLSearchParams(params)
        console.log(baseUrl + queryParams)

        const response = await fetch(baseUrl + queryParams)
        .then( response => response.json() )
        console.log(response)

        for(let book of response.items) {
          let title = book.volumeInfo.title
          let img = book.volumeInfo.imageLinks
          let description = book.volumeInfo.description
          this.searchResults.push({
            title: title ? title : '',
            image: img ? img.thumbnail : '',
            description: description ? description.slice(0, 40) : ''
          })
        }
      },
      deleteLocalStorage() {
        this.$emit('delete-local-storage')
      }
    },
  }
</script>