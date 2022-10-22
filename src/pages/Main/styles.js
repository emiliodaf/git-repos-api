import styled, { keyframes, css } from "styled-components";


export const Container = styled.div `

max-width: 800px;
background-color: #fff;
border-radius: 5px;
box-shadow: 0 0 20px rgba(0,0,0,0.2);
margin: 80px auto;
padding: 30px;

h1 {
   
    font-size: 20px;
    font-weight: bold;
    color: #404040;
    padding: 15px 0;
    align-items: center;
    display: flex;
    flex-direction: row;
}

svg {
    margin-right: 10px;
    color: #404040;
    cursor: pointer;
    
}

`;

export const Form = styled.form `

   margin-top: 30px;
   display: flex;
   flex-direction: row;

input {
    flex: 1;
    font-size: 15px;
    border: 1px solid ${props => (props.error ? '#FF0000' : '#eee')};
    padding: 15px 15px;
    border-radius: 5px;
    
}

`;

//setting button animaton//

const animate = keyframes `

from{
    transform: rotate(0deg);
}

to{
    transform: rotate(360deg);
}

`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
})) `

  background: #FF0000;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;

  }

  ${props => props.loading &&
    css`
    svg{
        animation:${animate} 20s linear infinite;
    }
    `
}

`;

export const List = styled.ul `

list-style: none;
margin-top: 20px;

li {
    padding: 15px 0;
    color: blue;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & + li {
        border-top: 1px solid #eee;
    }

    a {
        color: #404040;
        text-decoration: none;
    }  

}

`
export const DeleteButton =  styled.button.attrs({
    type:'button'
})`
  background: transparent;
  color: #404040;
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
`;
