import styled from 'styled-components'
// import  * as Color from '../../../theme/attribute/color'
import  {color,ColorSchema,darkcolor,lightcolor} from '../../../theme/attribute/color'



export const StyledTextInput = styled.TextInput`
    background-color: ${props => props?.theme?.color.typo[props.bgColor] || props.bgColor};
    padding-top: 15px;
    margin-bottom: 15px;
    width: 250px;
    border-radius: 10px;
    border-color: ${color.footer.dark};
    border-width: 1px;
    flex-wrap: wrap;
    overflow: scroll
`