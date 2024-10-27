import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "@/features/job/jobSlice";
import toggleSlice from "@/features/toggle/toggleSlice";
import filterSlice from "@/features/filter/filterSlice";
import employerSlice from "@/features/employer/employerSlice";
import employerFilterSlice from "@/features/filter/employerFilterSlice";
import candidateSlice from "@/features/candidate/candidateSlice";
import candidateFilterSlice from "@/features/filter/candidateFilterSlice";
import shopSlice from "@/features/shop/shopSlice";
import userSlice from "@/store/reducers/user"
import { wishlistReducer } from "./reducers/Whishlist";


export const store = configureStore({
    reducer: {
        wishlist:wishlistReducer,
        job: jobSlice,
        toggle: toggleSlice,
        filter: filterSlice,
        employer: employerSlice,
        employerFilter: employerFilterSlice,
        candidate: candidateSlice,
        candidateFilter: candidateFilterSlice,
        shop: shopSlice,
        auth: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
