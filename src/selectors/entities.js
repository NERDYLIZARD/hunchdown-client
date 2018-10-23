/**
 * Created on 11-Oct-18.
 */
// import { createSelector } from "reselect";

export const selectEntities = (state) => state.entities;

export const selectBoxesEntity = (state) => state.entities.boxes;

export const selectBoxById = (state, id) => state.entities.boxes[id];


