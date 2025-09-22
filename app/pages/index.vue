<template>
  test
  <k-page>
    <k-navbar title="To Do Liste">
      
      <template #left>
        <div>
          &nbsp;&nbsp;&nbsp;<SunIcon class="w-7 h-7 text-gray-600 hover:text-yellow-600"/>&nbsp;&nbsp;&nbsp;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;<MoonIcon class="w-7 h-7 text-gray-600 hover:text-blue-600"/>&nbsp;&nbsp;&nbsp;
        </div>
      </template>
      
      <template #right>
        <h1  @click="signOut">&nbsp;&nbsp;&nbsp;Logout&nbsp;</h1>
        <ArrowRightStartOnRectangleIcon class="w-7 h-7 text-gray-600" />&nbsp;&nbsp;
      </template>
  
      <template #subnavbar>
        <k-segmented strong rounded :key="activeSegmented">
          <k-segmented-button :active="activeSegmented === 1" @click="() => (activeSegmented = 1)"> Add To Do </k-segmented-button>
          <k-segmented-button :active="activeSegmented === 2" @click="() => (activeSegmented = 2)"> To Do </k-segmented-button>
          <k-segmented-button :active="activeSegmented === 3" @click="() => (activeSegmented = 3)"> Done </k-segmented-button>
        </k-segmented>
      </template>
    </k-navbar>
    <div v-if="activeSegmented=== 1">
      <pre>{{ todo }}</pre>

    <k-block-title>Add To Do</k-block-title>

    <k-list inset-ios strong-ios>
      <k-list-input
        outline
        label="Titel"
        floating-label
        type="title"
        placeholder="Titel"
        :value="todo.titel"
        @input="todo.titel = $event.target.value"
      >
        
      </k-list-input>

      <k-list-input
        outline
        label="Beschreibung"
        floating-label
        type="beschreibung"
        placeholder="Beschreibung"
        :value="todo.description"
        @input="todo.description = $event.target.value"
      >
        
      </k-list-input>

      <k-list-input
        outline
        label="Datum"
        type="date"
        placeholder="Bitte Auswählen..."
        :value="todo.date_ToDo"
        @input="todo.date_ToDo = $event.target.value"
      >
        <!--Hallo--> 
      </k-list-input>

        <div class="px-4">
          <k-segmented strong class="w-full">
            <k-segmented-button
              :active="!todo.completed"
              @click="todo.completed = false"
            >
              To Do
            </k-segmented-button>
            <k-segmented-button
              :active="todo.completed"
              @click="todo.completed = true"
            >
              Done
            </k-segmented-button>
          </k-segmented>
        </div>

        <br>
        <div class="flex justify-center">
          <k-button raised class="w-60 h-11" @click="AddToDo">Hinzufügen</k-button>
        </div>
        <br>
      
    </k-list>
    </div>

    <div v-else-if="activeSegmented===2">
      <pre>{{ todo_data }}</pre>
      <k-block-title>To Do</k-block-title>
      <k-list inset strong v-for="d of todo_data">
        <div v-if="!d.completed">
        <k-list-item
          :title="d.titel"
          :key="d.id"/>
          <k-list-item>
            <template #inner>

              {{ d.description }}<br/>
              {{ d.date_ToDo }}
              <k-segmented strong class="w-full">
            <k-segmented-button
              :active="!d.completed"
              @click="updateDone(d, false)"
            >
              To Do
            </k-segmented-button>
            <k-segmented-button
              :active="d.completed"
              @click="updateDone(d, true)"
            >
              Done
            </k-segmented-button>
          </k-segmented>
            </template>
            
            </k-list-item>
            
            </div>
      </k-list>
    </div>

    <div v-else-if="activeSegmented===3">
      
      <k-block-title>Done</k-block-title>
      <k-list inset strong v-for="d of todo_data">
        <div v-if="d.completed">
        <k-list-item
          :title="d.titel"
          :key="d.id" />
          <k-list-item>
            <template #inner>

              {{ d.description }}<br/>
              {{ d.date_ToDo }}
              <k-segmented strong class="w-full">
            <k-segmented-button
              :active="!d.completed"
              @click="updateDone(d, false)"
            >
              To Do
            </k-segmented-button>
            <k-segmented-button
              :active="d.completed"
              @click="updateDone(d, true)"
            >
              Done
            </k-segmented-button>
          </k-segmented>
            </template>
            </k-list-item>
            </div>
      </k-list>
    </div>

  </k-page>
</template>
<script setup>
import { ref } from 'vue'
import {
  kFab,
  kButton,
  kBlock,
  kSegmented,
  kSegmentedButton,
  kPage,
  kNavbar,
  kBlockTitle,
  kList,
  kListItem,
  kListInput,
} from 'konsta/vue'

import { ArrowRightStartOnRectangleIcon, PencilSquareIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const supabase = useSupabaseClient()

const activeSegmented = ref(2)

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
   return navigateTo('/login')
}

const todo_data = ref([])

const {data, error} =  await supabase.from("App_ToDo").select("*")

console.log(data,error)
todo_data.value = [...data]

async function AddToDo() {
  console.log(todo.value)
  const { error } = await supabase
  .from('App_ToDo')
  .insert(todo.value)
  console.log('insert error =>', error?.message, error?.details, error)
}

async function updateDone(record, value) {
  record.completed = value
  console.log(record, value)
  await supabase.from("App_ToDo").upsert(record)
}

const todo = ref({
  titel: '',
  description: '',
  date_ToDo: '',
  completed: false
})

const darkMode = ref()

</script>
