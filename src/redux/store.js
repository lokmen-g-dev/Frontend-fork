import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlide";
// import claimReducer from "./features/claimSlide"
import claimReducer2 from "./features/ClaimSlide"

export default configureStore({
    reducer:{
        user:userReducer,
        // claimId:claimReducer,
        claim:claimReducer2
    }
})

