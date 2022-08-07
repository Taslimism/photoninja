import create from "zustand";

const useSearchStore = create((set) => ({
	searchTerm: "",
	setSearchTerm: (term) => set({ searchTerm: term }),
	clearSearchTerm: () => set({ searchTerm: "" }),
}));

export default useSearchStore;
