import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const Container = styled.div `

 max-width: 700px;
 background-color: #fff;
 border-radius: 5px;
 box-shadow: 0 0 20px rgba(0,0,0,0.4);
 padding: 30px;
 margin: 80px auto;

`;

export const Loading = styled.div `

color: #fff;
display: flex;
align-items: center;
justify-content: center;
height: 100vh;

`;

export const Owner = styled.header `

display: flex;
flex-direction: column;
align-items: center;

img {
    width: 200px;
    border-radius: 20%;
    margin: 20px 0;
}

h1 {
    font-size: 30px;
    color: #fff;
}

p {
    margin-top: 5px;
    font-size: 15px;
    color: orange;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
}


`;

export const BackButton = styled(Link) `

border: 5px solid white;
border-radius: 20%;
padding: 15px 15px;
background: transparent;

`;

export const IssuesList = styled.ul `

margin-top: 30px;
padding-top: 30px;
border-top: 1px solid #eee;
list-style: none;

li {
    display: flex;
    padding: 15px 10px;

    & + li{
        margin-top: 12px;
    }
}

img {
    width: 80px;
    height: 80px;
    border-radius: 50%;

}

div {
    flex: 1;
    padding-left: 12px;

    p {
        margin-top: 10px;
        font-size: 12px;
        color: #222;
    }
}

strong {
   font-size: 15px;


a {
    color: #404040;
    text-decoration: none;
    transition: 0.8s;

    &:hover{
        color: #3f00ff;
    }
    
   }

   span {
     background: #5788;
     color: #FF00FF;
     border-radius: 5px;
     font-size: 12px;
     font-weight: 500;
     padding: 4px 7px;
     margin-left: 10px;
   }
}

`;

export const PageActions = styled.div `

display: flex;
align-items: center;
justify-content: space-between;

button {
    outline: 0;
    border: 0;
    border-radius: 5px;
    background-color: #8737f0;
    color: #fff;
    padding: 15px 10px;

    &:disabled{
        cursor: not-allowed;
        opacity: 0.7;
    }
    
}

`;

export const FilterList = styled.div `

margin: 15px 0;

button {
    outline: 0;
    border: 0;
    border-radius: 5px;
    padding: 15px 10px;
    margin: 0 50px;  

    &:nth-child(${props => props.active + 1}){
        background: #08a0d8;
        color: #fff;
    }
    
}


`;