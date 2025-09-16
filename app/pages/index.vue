<template>
  <k-page>
    <k-navbar title="To Do Liste">
      <k-fab
      @click="signOut"
      class="fixed right-safe-3 ios:top-safe-3 material:top-safe-18 z-20 k-color-brand-red"
    >logout
      <template #icon>
        <component class="size-6" :is="PlusIcon" />
      </template>
    </k-fab>

      
      <template #subnavbar>
        <k-segmented strong rounded>
          <k-segmented-button active> Add To Do </k-segmented-button>
          <k-segmented-button > To Do </k-segmented-button>
          <k-segmented-button > Done </k-segmented-button>
          
        </k-segmented>
      </template>
    </k-navbar>
      
    <k-block-title>Add To Do</k-block-title>
    <k-list inset-ios strong-ios>
      <k-list-input
        outline
        label="Titel"
        floating-label
        type="text"
        placeholder="Titel"
      >
        
      </k-list-input>

      <k-list-input
        outline
        label="Beschreibung"
        floating-label
        type="text"
        placeholder="Beschreibung"
      >
        
      </k-list-input>

      <k-list-input
        outline
        label="Datum"
        type="date"
        default-value="2025-01-01"
        placeholder="Bitte Auswählen..."
      >
        <!--Hallo-->
      </k-list-input>

        <div class="px-4">
          <k-segmented strong class="w-full">
            <k-segmented-button
              :active="statusToDo"
              @click="statusToDo = true"
            >
              To Do
            </k-segmented-button>
            <k-segmented-button
              :active="!statusToDo"
              @click="statusToDo = false"
            >
              Done
            </k-segmented-button>
          </k-segmented>
        </div>

        <br>
        <div class="flex justify-center">
          <k-button raised class="w-60 h-11">Hinzufügen</k-button>
        </div>
        <br>
        <div @click="signOut" class="flex justify-center">
          <k-button raised class="w-60 h-11">Logout</k-button>
        </div>
      

    </k-list>
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
  kListInput,
} from 'konsta/vue'

const supabase = useSupabaseClient()

const statusToDo = ref(true)

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
}

</script>
