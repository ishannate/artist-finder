import styled from "styled-components";

export default styled.button<{ transparent?: boolean, textColor?: string }> `
    background-color: ${props => (props.transparent ? "#ffffff00" : "#0d6efd")};
    color: ${props => (props.textColor ? props.textColor : "white")};
    border: none;
    font-weight: 700;
    padding-right: 20px;
    padding-left:20px;
    padding-top:5px;
    padding-bottom: 5px;
    &:hover {
   color: ${props => (props.textColor ? "white" : "#0d6efd")};
  }
`