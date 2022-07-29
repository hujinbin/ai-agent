import React, { Fragment } from 'react'

// Styles
import './common/styles/index.css'

// 以下代码将会报错，最外层不能存在并列的标签。
function App() {
    return (
        <Fragment>
            <div className="App">
                <h1>This is React App.</h1>
            </div>
            <div className="App-other">
                <h1>This is React App-other.</h1>
            </div>
        </Fragment>
    )
}

export default App