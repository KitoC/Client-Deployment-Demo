import React, {Component} from 'react'
import axios from 'axios'
import Modal from './../../UI/Modal'
import EditBookmark from './EditBookmark'
import { bookmarksAPI } from './../../Helpers/apiHelper'




class Bookmark extends Component {
    
    constructor(props) {
        super(props);
        this.modal = React.createRef()
        this.state = {
            bookmark: null,
            hide: true
        }
    }

    async setBookmark() {
        const { match } = this.props
        try {
            let bookmark = await bookmarksAPI.find(`/${match.params.id}`)
            this.setState({
                bookmark: bookmark.data
            })
        } catch (error) {
            alert('There was a problem', error)
        }
    }


    componentDidMount = () => {
        const { match } = this.props
     
        
        this.setBookmark().then(() => {
            const {title, url, _id} = this.state.bookmark

            this.setState({
                title: title,
                url: url,
                id: _id
            })

        })
    }

    edit = (e) => {
        e.preventDefault()
        const { id, title, url } = this.state

        bookmarksAPI.edit(`/${id}`, { title, url }, () => {
            this.toggleForm()
        })     
    }
    
    destroy = () => {
        const { id } = this.state
        bookmarksAPI.destroy(`/${id}`, () => {
            const { history } = this.props
            history.push('/bookmarks', null)
        })
    }

    toggleForm = () => {
        this.modal.current.toggleForm()
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

 
    
    render(){
        const { title, url, hide, showEditForm } = this.state
        
        return (
            <div className="bookmark">

                <div>
                    <h3>{title}</h3>
                    <p>{url}</p>
                    <div className="button-box">
                        <button onClick={this.toggleForm}>Edit</button>
                        <button onClick={this.destroy}>Delete</button>
                    </div>
                </div>
                <Modal ref={this.modal} showEditForm={showEditForm} >
                    <EditBookmark {...this.state} onSubmit={this.edit} titleChange={this.title} urlChange={this.url} />
                </Modal>
            </div>

        )
    }
}

export default Bookmark