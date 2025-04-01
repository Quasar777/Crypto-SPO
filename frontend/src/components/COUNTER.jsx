import React, { useContext } from "react";
import SimpleStore from '../../store/store'
import { observer } from "mobx-react-lite";
import { Context } from "../main";

function Counter() {
    const {store} = useContext(Context)

    return (
        <div>
            <button onClick={() => store.addCount()} style={{width: 50}}>+</button>
            <p style={{color: '#fff'}}>{store.count}</p>
            <button onClick={() => store.minusCount()} style={{width: 50}}>-</button>
        </div>
    );
}

export default observer(Counter)