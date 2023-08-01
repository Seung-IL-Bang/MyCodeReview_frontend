import { forwardRef, useImperativeHandle, useState } from "react";
import { Form } from "react-bootstrap";
import styled from 'styled-components'

const Tag = forwardRef(function Tag(props, ref) {
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState(props.initialValue);

  useImperativeHandle(ref, () => {
    return {
      getTagList() {
        return tagList;
      }
    }
  }, [tagList])

  const onKeyPress = e => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      submitTagItem();
    }
  }

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem('');
  }

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem);
    setTagList(filteredTagList);
  }

  return (
    <WholeBox>
      <TagBox>
        {tagList.map((tagItem, index) => {
          return (
            <TagItem key={index}>
              <Text>{tagItem}</Text>
              <Button onClick={deleteTagItem} disabled={props.readOnly}>X</Button>
            </TagItem>
          );
        })}
        <Form.Control
          type='text'
          placeholder='태그를 입력하세요.'
          tabIndex={2}
          onChange={e => setTagItem(e.target.value)}
          value={tagItem}
          onKeyUp={onKeyPress}
          readOnly={props.readOnly}
        />
      </TagBox>
    </WholeBox>
  );
});

export default Tag;

const WholeBox = styled.div`
  padding: 1rem;
`

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 3.5rem;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`

const TagItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: #F8F8F8;
  border-radius: 5px;
  color: #424242;
  font-size: 0.875rem;
`

const Text = styled.span``

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  background-color: #FFFFFF;
  border: none;
  border-radius: 50%;
  color: #FF1744;
  font-size: 0.875rem;
  cursor: pointer;
`

