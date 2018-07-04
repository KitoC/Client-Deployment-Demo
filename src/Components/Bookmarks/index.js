import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom';
import Bookmark from '../Bookmark'
import BookmarkNew from '../BookmarkNew'
import { bookmarksAPI } from './../../Helpers/apiHelper'
// import {setJwt, api} from './../../Api/init'




class Bookmarks extends Component {
    constructor(){
        super()
        this.modal = React.createRef()
        this.state = {
            bookmarks: [],
            title: '',
            url: '',
            id: ''
        }
    }


    async setBookmarks() {
        try {
            
            const response = await bookmarksAPI.all()
            this.setState({
                bookmarks: response.data
            })
            
        } catch (error) {
            alert('There was a problem', error)
        }
    }

    bookmarkShow = (id) => {
        return this.state.bookmarks.find(bookmark => bookmark._id === id )
    }

    componentDidMount() {
        this.setBookmarks()
    }

    componentDidUpdate(prevProps, prevState ) {
        if (this.state.bookmarks !== prevState.bookmarks){
            this.setBookmarks()
        }
    }
    
    edit = (e, id) => {
        console.log('made it this far', id)
        e.preventDefault()
        const { title, url } = this.state

        bookmarksAPI.edit(`/${id}`, { title, url }, () => {
            this.toggleForm()
        })
    }

    destroy = (id) => {

        const { bookmarks } = this.state
        const index = bookmarks.findIndex(bookmark => bookmark._id === id )
        const updatedBookmarks = [...bookmarks]
        // console.log(id, index)
        // console.log(updatedBookmarks)
        // updatedBookmarks.splice(index, 1)
        // console.log(updatedBookmarks)
        
        if (index >= 0){
            updatedBookmarks.splice(index, 1)

            bookmarksAPI.destroy(`/${id}`, () => {
                this.setState({
                    bookmarks: updatedBookmarks
                }, () => {
                    const { history } = this.props
                    history.push('/bookmarks', null)
                })
            })
        }
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
        }, ()=> console.log(this.state.url))
    }

    render(){
        const { match, role } = this.props
        const { bookmarks } = this.state
        return (
            
            <div>
            
                <Route exact path={match.url} render={(routerProps) => (
                    <div id="all-bookmarks">
                        <h1>Bookmarks!</h1>
                    {role === 'admin' && <Link to={`${match.url}/new`}>New Bookmark</Link>}
                        <ul>
                            {bookmarks.map(bookmark => (
                                <li key={bookmark._id}>
                                    <p><strong>{bookmark.title}</strong> - {bookmark.url}<span> 
                                    <Link to={`${match.url}/id/${bookmark._id}`}>Show</Link></span></p>
                                </li>
                              ))
                            }
                        </ul>
                    </div>
                )} />
                
                <Route path={`${match.url}/id/:id`} render={(routerProps) =>{ 
                    return( 
                            <Bookmark bookmarkShow={this.bookmarkShow} url={this.url} title={this.title} modalRef={this.modal} destroy={this.destroy} edit={this.edit} toggleForm={this.toggleForm} {...routerProps} />
                        )
                    } 
                } />

                <Route path={`${match.url}/new`} component={BookmarkNew} />

            </div>

        )
    }
}

export default Bookmarks