import styled from "styled-components";
import { color, ColorSchema } from "../../attribute";

// export const StyledButton = styled.TouchableOpacity`
//     font-size: 130px;
//     color: red;
//     border: 1px solid ${props => props?.theme?.ColorSchema[props.btnColor] || props.btnColor};
//     justify-content: center;
//     padding: 10px 15px;
//     width: 200px;
//     height: 100px;
// `

export const StyledButton = styled.View`
    width: 55px;
    height: 55px;
    border-radius: 55px;
    background-color: ${props => props?.theme?.color.typo[props.btnColor] || props.btnColor};
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    elevation: 10;
    /* border-color: ${ColorSchema.danger}; */
    /* border-width: 1px; */
`
// export const StyledTextInput = styled.TextInput `
//     background-color: #fff;
//     padding-left: 15px;
//     padding-top: 15px;
//     padding-bottom: 15px;
//     width: 230px;
//     border-radius: 60px;
//     border-color: #c0c0c0;
//     border-width: 1px;
//     flex-wrap: wrap;
//     overflow: scroll
// `