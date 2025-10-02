<template>
  <k-page>
    <k-navbar title="To Do Liste">

      <template #left>
        <div v-if="!darkMode">
          <k-button rounded clear @click="toggleDark">
            <SunIcon class="w-7 h-7 text-gray-600 hover:text-yellow-600" />
          </k-button>
        </div>
        <div v-else-if="darkMode">
          <k-button rounded clear class=" group hover:text-blue-600" @click="toggleDark">
            <MoonIcon class="w-7 h-7 text-gray-600 group-hover:text-blue-600" />
          </k-button>
        </div>
      </template>

      <template #right>
        <k-button rounded clear @click="signOut" class=" text-gray-600 font-bold">
          Logout&nbsp;
          <ArrowRightStartOnRectangleIcon class="w-7 h-7 text-gray-600" />
        </k-button>
      </template>

      <template #subnavbar>
        <k-segmented strong rounded :key="activeSegmented">
          <k-segmented-button :active="activeSegmented === 1" @click="() => (activeSegmented = 1)"> Add To Do
          </k-segmented-button>
          <k-segmented-button :active="activeSegmented === 2" @click="() => (activeSegmented = 2)"> To Do
          </k-segmented-button>
          <k-segmented-button :active="activeSegmented === 3" @click="() => (activeSegmented = 3)"> Done
          </k-segmented-button>
        </k-segmented>
      </template>
    </k-navbar>
    <div v-if="activeSegmented === 1">
      <pre>{{ todo }}</pre>

      <k-block-title>Add To Do</k-block-title>

      <k-list inset-ios strong-ios>
        <k-list-input outline label="Titel" floating-label type="title" placeholder="Titel" :value="todo.titel"
          @input="todo.titel = $event.target.value">

        </k-list-input>

        <k-list-input outline label="Beschreibung" floating-label type="beschreibung" placeholder="Beschreibung"
          :value="todo.description" @input="todo.description = $event.target.value">

        </k-list-input>

        <k-list-input outline label="Datum" type="date" placeholder="Bitte Auswählen..." :value="todo.date_ToDo"
          @input="todo.date_ToDo = $event.target.value">
          <!--Hallo-->
        </k-list-input>

        <div class="px-4">
          <k-segmented strong class="w-full">
            <k-segmented-button :active="!todo.completed" @click="todo.completed = false">
              To Do
            </k-segmented-button>
            <k-segmented-button :active="todo.completed" @click="todo.completed = true">
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

    <div v-else-if="activeSegmented === 2">
      <pre>{{ active_todo }}</pre>
      <k-block-title>To Do</k-block-title>
      <k-list inset strong v-for="d of todo_data">
        <div v-if="!d.completed">

          <k-list-item :title="d.titel" :key="d.id">

            <template #after>
              <k-button clear class="group hover:bg-red-500">
                <TrashIcon @click="() => (deleteOpend = true, active_todo = d)"
                  class="w-7 h-7 text-red-500 group-hover:text-white" />
              </k-button>
              <k-button clear class="group hover:bg-blue-500">
                <PencilSquareIcon @click="() => (editOpend = true, active_todo = d)"
                  class="w-7 h-7 text-blue-500 group-hover:text-white" />
              </k-button>
            </template>

          </k-list-item>
          <k-list-item>
            <template #inner>

              {{ d.description }}<br />
              {{ d.date_ToDo }}
              <k-segmented strong class="w-full">
                <k-segmented-button :active="!d.completed" @click="updateDone(d, false)">
                  To Do
                </k-segmented-button>
                <k-segmented-button :active="d.completed" @click="updateDone(d, true)">
                  Done
                </k-segmented-button>
              </k-segmented>
            </template>

          </k-list-item>

        </div>
      </k-list>

      <k-dialog class="w-[90vw] max-w-lg sm:max-w-xl md:max-w-2xl p-6" :opened="deleteOpend"
        @backdropclick="() => (deleteOpend = false)">

        <h2 class="text-xl font-bold">Löschen</h2>

        <b class="flex justify-center text-xl">🚨 Wollen Sie es wirklich löschen? 🚨</b>


        <template #buttons>
          <k-dialog-button strong @click="deleteToDo">
            Bestätigen
          </k-dialog-button>
        </template>
      </k-dialog>

      <k-dialog class="w-[90vw] max-w-lg sm:max-w-xl md:max-w-2xl p-6" :opened="editOpend"
        @backdropclick="() => (editOpend = false)">
        <h2 class="text-xl font-bold">Löschen</h2>
        <k-list inset-ios strong-ios>
          <k-list-input outline label="Titel" floating-label type="title" placeholder="Titel" :value="active_todo.titel"
            @input="active_todo.titel = $event.target.value">

          </k-list-input>

          <k-list-input outline label="Beschreibung" floating-label type="beschreibung" placeholder="Beschreibung"
            :value="active_todo.description" @input="active_todo.description = $event.target.value">

          </k-list-input>

          <k-list-input outline label="Datum" type="date" placeholder="Bitte Auswählen..."
            :value="active_todo.date_ToDo" @input="active_todo.date_ToDo = $event.target.value">

          </k-list-input>
        </k-list>
        <template #buttons>
          <k-dialog-button strong @click="updateToDo">
            Bestätigen
          </k-dialog-button>
        </template>
      </k-dialog>

      <k-toast position="center" :opened="successfulNotification">
        {{ successfulNotificationMessage }} {{ errorNotificationMessage }}
      </k-toast>

    </div>

    <div v-else-if="activeSegmented === 3">

      <k-block-title>Done</k-block-title>
      <k-list inset strong v-for="d of todo_data">
        <div v-if="d.completed">
          <k-list-item :title="d.titel" :key="d.id">

            <template #after>
              <PencilSquareIcon class="w-7 h-7 text-blue-500 hover:text-blue-300" />
            </template>
          </k-list-item>
          <k-list-item>
            <template #inner>

              {{ d.description }}<br />
              {{ d.date_ToDo }}
              <k-segmented strong class="w-full">
                <k-segmented-button :active="!d.completed" @click="updateDone(d, false)">
                  To Do
                </k-segmented-button>
                <k-segmented-button :active="d.completed" @click="updateDone(d, true)">
                  Done
                </k-segmented-button>
              </k-segmented>
            </template>
          </k-list-item>
        </div>
      </k-list>

      <k-dialog>

      </k-dialog>

    </div>

  </k-page>
</template>
<script setup>
import { ref } from 'vue'
import {
  kToast,
  kFab,
  kButton,
  kBlock,
  kDialog,
  kDialogButton,
  kSegmented,
  kSegmentedButton,
  kPage,
  kNavbar,
  kBlockTitle,
  kList,
  kListItem,
  kListInput,
} from 'konsta/vue'

import { ArrowRightStartOnRectangleIcon, PencilSquareIcon, SunIcon, MoonIcon, TrashIcon } from '@heroicons/vue/24/outline'

const supabase = useSupabaseClient()

const activeSegmented = ref(2)

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return navigateTo('/login')
}

const todo_data = ref([])
const active_todo = ref({})

const { data, error } = await supabase.from("App_ToDo").select("*")

console.log(data, error)
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

async function updateToDo() {
  console.log(active_todo)
  const { data, error } = await supabase.from("App_ToDo").upsert(active_todo.value)
  console.log(data, error)

  if (data) {
    successfulNotificationMessage.value = '✅ Erfolgreich Gespeichert! ✅'
    successfulNotification.value = true
    setTimeout(successfulNotificationClose, 5000)
  }
  if (error) {
    errorNotificationMessage.value = '❌ !Fehler! Nicht Gespeichert ❌'
    errorNotification.value = true
    setTimeout(errorNotificationClose, 5000)
  } 
}

async function deleteToDo() {
  console.log(active_todo)
  const { data, error } = await supabase
    .from('App_ToDo')
    .delete()
    .eq('id', active_todo.value.id)
  console.log(error, data)

  todo_data.value = todo_data.value.filter(t => t.id !== active_todo.value.id)
}

const todo = ref({
  titel: '',
  description: '',
  date_ToDo: '',
  completed: false
})

const darkMode = ref(false)

function toggleDark() {
  window.setMode = (darkMode) => {
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
      darkMode.value = false
    }
    else {
      document.documentElement.classList.remove('dark')
      darkMode.value = true
    }
  }
}

function successfulNotificationClose() {
  successfulNotification.value = false
}

function errorNotificationClose() {
  errorNotificationClose.value = false
}

const successfulNotificationMessage = ref('')

const errorNotificationMessage = ref('')

const successfulNotification = ref(false)

const errorNotification = ref(false)

const editOpend = ref(false)

const deleteOpend = ref(false)

</script>
