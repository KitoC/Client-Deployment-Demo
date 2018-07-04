import Form from './../../UI/Form'
import React from 'react'
import FormField from '../../UI/FormField';

const EditBookmark = (props) => {

    const {title, url, onSubmit, titleChange, urlChange, id} = props
    
    return (
        
            <Form buttonText="Edit Bookmark" onSubmit={(e) => onSubmit(e, id)}>
                <FormField onChange={titleChange} name="title" placeholder={title} type="text"  label="Title"/>
                <FormField onChange={urlChange} name="url" placeholder={url} type="text"  label="URL"/>
            </Form>
    
    )
}

export default EditBookmark
