import { configureStore } from "@reduxjs/toolkit";
import AreYouSure from './AreYouSureSlice'
import YesSure from './YesSureSlice'
import FetchShopDetail from './FetchShopDetailSlice'


const Store=configureStore({
    reducer:{
        show:AreYouSure ,
        Yes:YesSure,
        shopData:FetchShopDetail 

    }
})

export default Store;