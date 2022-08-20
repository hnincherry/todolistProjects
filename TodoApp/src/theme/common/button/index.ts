import styled from "styled-components";


export const StyledButton = styled.TouchableOpacity`
    font-size: 130px;
    color: red;
    border: 1px solid ${props => props?.theme?.ColorSchema[props.btnColor] || props.btnColor};
    justify-content: center;
    padding: 10px 15px;
    width: 200px;
    height: 100px;
`

export const StyledTextInput = styled.TextInput `
    background-color: #fff;
    padding-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    width: 230px;
    border-radius: 60px;
    border-color: #c0c0c0;
    border-width: 1px;
    flex-wrap: wrap;
    overflow: scroll
`