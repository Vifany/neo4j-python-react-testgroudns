import {create} from 'zustand';


const API_URI = 'http://localhost:8000/';



interface Thread {
    id: string;
    body: string;
}

interface ThreadStore {
    threads: Thread[];
    threadCount: number;
}

// Define the type for your state
interface ThreadState {
  data: ThreadStore;
  isLoading: boolean;
  error: string | null;
  fetchThreads: () => Promise<void>;
}

// Create your store
const useThreadsState = create<ThreadState>((set) => ({
  data: { threads: [], threadCount: 0 },
  isLoading: false,
  error: null,

  // Action to fetch data
  fetchThreads: async () => {
    set({ isLoading: true, error: null });
    try {
      // Perform your data fetching here, for example using fetch API
      const response = await fetch(API_URI+'threads/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      set({ data, isLoading: false, error: null });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ isLoading: false, error: error.message });
      }
    }
  }
}));

export default useThreadsState;