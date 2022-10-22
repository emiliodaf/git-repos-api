import React, { useCallback, useState, useEffect } from 'react';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash  } from 'react-icons/fa';
import api from '../../services/api';
import {Link} from 'react-router-dom';


export default function Main() {

const [newRepo, setNewRepo ] = useState ('');
const [ repositories, setRepositories ] = useState ([]);
const [ loading, setLoading ] = useState (false);
const [alert, setAlert] = useState (null);

//DidMount - Search

useEffect(() => {
  const repoStorage = localStorage.getItem('repos');
  if(repoStorage){
     setRepositories(JSON.parse(repoStorage))
  }
},[])

//DidUpdate - Saving changes





const handleonSubmit = useCallback((e) =>{
   e.preventDefault();

   async function submit(){
    setLoading(true);
    setAlert(null);
    try {

      if(newRepo === ''){
        throw new Error('you need to choose a repository');
      }


     const response = await api.get(`repos/${newRepo}`);

     const hasRepo = repositories.find(repo => repo.name === newRepo);

     if(hasRepo){
      throw new Error('Duplicate Repository');
     }

      const data = {
        name: response.data.full_name,
      }
    
      setRepositories([...repositories,data]);
      setNewRepo('');

     }catch(error){
      setAlert(true);
      console.log(error);
     }finally{
      setLoading(false);
     }
   
   }

   submit();

}, [newRepo, repositories]);
 
function handleonChange(e) {

  setNewRepo(e.target.value);
  setAlert(null);

}

const handleDelete = useCallback((repo)=> {
  const find = repositories.filter(r => r.name !== repo);
  setRepositories(find);
}, [repositories]);


  return (
    <Container>
     <FaGithub size={40}/>
     <h1>My Repositories</h1> 
    <Form onSubmit={handleonSubmit} error={alert}>
        <input type='text' 
         placeholder='Add Repositories'
         value={newRepo}
         onChange={handleonChange}
         />
          <SubmitButton Loading={loading ? 1 : 0}>
            {loading ? (
               <FaSpinner color='#fff' size={25}/>
            ) : (
              <FaPlus color='#fff' size={12}/>
            )}
          </SubmitButton>
    </Form>

    <List>
      
       {repositories.map(repo => (
            <li key={repo.name}>
              <span>
                <DeleteButton onClick={()=> handleDelete(repo.name)}>
                  <FaTrash size={14}/>
                </DeleteButton>  
              {repo.name}
              </span> 
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                <FaBars size={20}/>
              </Link>
            </li>  
       ))}

    </List>
  
    </Container>
  )
}
