import { createSlice } from "@reduxjs/toolkit";

export const claimSlice = createSlice ({
    name:"claim",
    initialState : {
        claim :null,
        deletedMsg:null
    },
    reducers : {
        claimInfo : (state, action) => {
            state.claim = action.payload;
        },
        deleteMsg :(state,action) => {
            state.deletedMsg =action.payload; 
        }
    },
});

export const {claimInfo,deleteMsg} = claimSlice.actions;

export const selectClaim = (state) => state.claim.claim;
export const select1Claim = (state) => state.claim.deletedMsg;


export default claimSlice.reducer;