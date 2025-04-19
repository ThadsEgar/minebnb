"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { getListings } from "../lib/api";

const SearchContext = createContext(null);

function searchReducer(state, action) {
  switch (action.type) {
    case "SET_FILTERS":
      return { ...state, filters: { ...action.payload } }; // one filter for now
    case "CLEAR_FILTERS":
      return { ...state, filters: {} };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: [...action.payload],
        totalResults: action.payload.length,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const searchInitialState = {
  filters: {},
  searchResults: [],
  loading: false,
  totalResults: 0,
  error: null,
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, searchInitialState);

  const setFilters = useCallback((filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" });
  }, []);

  const fetchSearchResults = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await getListings();
      dispatch({ type: "SET_SEARCH_RESULTS", payload: data });
    } catch (e) {
      console.error(e);
      dispatch({ type: "SET_ERROR", payload: e });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  useEffect(() => {
    fetchSearchResults();
  }, [state.filters]);

  return (
    <SearchContext.Provider
      value={{ ...state, setFilters, clearFilters, fetchSearchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
