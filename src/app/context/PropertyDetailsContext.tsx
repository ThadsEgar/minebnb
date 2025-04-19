"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { getPropertyDetailsPage } from "../lib/api";


export const PropertyDetailsContext = createContext(null);

const propertyDetailsInitialState = {
  propertyId: undefined,
  propertyDetailsResponse: undefined,
  error: undefined,
  loading: false
};

function propertyDetailsReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_PROPERTY":
      return { ...state, propertyId: action.payload };
    case "SET_PROPERTY_DETAILS_RESPONSE":
      return {...state, propertyDetailsResponse: action.payload}
    case "SET_ERROR":
      return {...state, error: action.payload}
    case "SET_LOADING":
      return {...state, loading: action.payload}
    default:
      return state;
  }
}

export const PropertyDetailsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertyDetailsReducer, propertyDetailsInitialState)

  const setPropertyId = useCallback((propertyId) => {
    dispatch({type: "SET_CURRENT_PROPERTY", payload: propertyId});
    console.log("Set property id dispatch called with propertyId", propertyId )
  }, [state.propertyId]);

  const fetchPropertyDetailsPage = useCallback(async () => {
    dispatch({type: "SET_LOADING", payload: true})
    try {
      const data = await getPropertyDetailsPage(state.propertyId)
      dispatch({type: "SET_PROPERTY_DETAILS_RESPONSE", payload: data})
      console.log("fetchPropertyDetailsPage called")
    } catch (e) {
      console.error(e); // TODO ADD ERROR STATE
      dispatch({type: "SET_ERROR", e})
    }
    dispatch({type: "SET_LOADING", payload: false})
  }, [state.propertyId])

  useEffect(() => {
    if (state.propertyId) {
      fetchPropertyDetailsPage();
      console.log("propertyId changed, fetching data:", state.propertyId);
    }
  }, [state.propertyId, fetchPropertyDetailsPage])

  return (
    <PropertyDetailsContext.Provider
    value={{...state, setPropertyId, fetchPropertyDetailsPage}}
    >
      {children}
    </PropertyDetailsContext.Provider>
  );
};

export function usePdp() {
  const context = useContext(PropertyDetailsContext);
  if (!context) {
    throw new Error("usePdp must be used within a PropertyDetailsProvider");
  }
  return context;
}
