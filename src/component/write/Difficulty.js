import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SelectedDifficulty from './SelectedDifficulty';

const Difficulty = forwardRef(function(props, ref) {

  const [difficulty, setDifficulty] = useState(props.initialValue);
  const [choice, setChoice] = useState(props.initialState);

  useImperativeHandle(ref, () => {
    return {
      getDifficulty() {
        return difficulty;
      }
    }
  }, [difficulty])

  const handleSelectDifficulty = (difficulty) => {
    setDifficulty(difficulty)    
    setChoice(true);
  }


  return (
    <div className='d-flex'>
    <DropdownButton id="dropdown-basic-button" title="문제 난이도">
      <Dropdown.Item onClick={() => handleSelectDifficulty('diamond')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/21-a.svg' alt='diamond'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('diamond5')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/21.svg' alt='diamond5'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('diamond4')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/22.svg' alt='diamond4'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('diamond3')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/23.svg' alt='diamond3'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('diamond2')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/24.svg' alt='diamond2'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('diamond1')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/25.svg' alt='diamond1'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('platinum')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/16-a.svg' alt='platinum'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('platinum5')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/16.svg' alt='platinum5'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('platinum4')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/17.svg' alt='platinum4'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('platinum3')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/18.svg' alt='platinum3'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('platinum2')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/19.svg' alt='platinum2'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('platinum1')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/20.svg' alt='platinum1'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('gold')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/11-a.svg' alt='gold'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('gold5')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/11.svg' alt='gold5'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('gold4')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/12.svg' alt='gold4'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('gold3')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/13.svg' alt='gold3'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('gold2')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/14.svg' alt='gold2'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('gold1')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/15.svg' alt='gold1'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('silver')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/6-a.svg' alt='silver'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('silver5')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/6.svg' alt='silver5'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('silver4')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/7.svg' alt='silver4'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('silver3')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/8.svg' alt='silver3'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('silver2')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/9.svg' alt='silver2'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('silver1')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/10.svg' alt='silver1'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('bronze')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/1-a.svg' alt='bronze'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('bronze5')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/1.svg' alt='bronze5'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('bronze4')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/2.svg' alt='bronze4'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('bronze3')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/3.svg' alt='bronze3'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('bronze2')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/4.svg' alt='bronze2'/></Dropdown.Item>
      <Dropdown.Item onClick={() => handleSelectDifficulty('bronze1')}><img src='https://d2gd6pc034wcta.cloudfront.net/tier/5.svg' alt='bronze1'/></Dropdown.Item>
    </DropdownButton>
    {choice && <SelectedDifficulty difficulty={difficulty}/>}
    </div>

  );
});

export default Difficulty;
