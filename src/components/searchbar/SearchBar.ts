import { usePlacesStore } from "@/composables";
import { computed, defineComponent, ref } from "vue";
import SearchResults from "../search-results/SearchResults.vue";

export default defineComponent({
  name: "SearchBar",
  components: { SearchResults },

  setup() {
    const debounceValue = ref("");
    const debounceTimeOut = ref(0);

    const { searchPlacesByTerm } = usePlacesStore();
    return {
      debounceValue,
      searchTerm: computed({
        get() {
          return debounceValue.value;
        },
        set(value: string) {
          if (debounceTimeOut.value) {
            clearTimeout(debounceTimeOut.value);
          }

          debounceTimeOut.value = setTimeout(() => {
            debounceValue.value = value;
            searchPlacesByTerm(value);
          }, 500);
        },
      }),
    };
  },
});
