import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }    
    html, body {
        background-color: #000;
        font-family: 'Roboto', sans-serif;
        color: #fff;
        -webkit-font-smoothing: antialiased;
    }   
`
