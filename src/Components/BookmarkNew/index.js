import React, { Component } from 'react'
import Form from './../../UI/Form'
import FormField from '../../UI/FormField';
import { bookmarksAPI } from './../../Helpers/apiHelper'


class BookmarkNew extends Component {

   state = {
       url: '',
       title: ''
   }

    title = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    url = (e) => {
        this.setState({
            url: e.target.value
        })
    }

    new = (e) => {
        e.preventDefault()
        const { title, url } = this.state
        
        bookmarksAPI.create({ title, url }, () => {
            const { history } = this.props
            history.push('/bookmarks', null)
        })

    }

    
    render(){
        
        return (
            <div>
                <Form buttonText="New Bookmark  " onSubmit={this.new}>
                    <FormField onChange={this.title} name="title" type="text"  label="Title"/>
                    <FormField onChange={this.url} name="url" type="text"  label="URL"/>
                </Form>
            </div>
        
        )
    }
}

export default BookmarkNew
