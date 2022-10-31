import styled from "styled-components";

export default styled.label < { textColor?: string } >`
    color: ${props => (props.textColor ? props.textColor : "white")};
    padding-right: 5px;
    left-padding: 6px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
   color: ${props => (props.textColor ? "white" : "#0d6efd")};
  }
`;