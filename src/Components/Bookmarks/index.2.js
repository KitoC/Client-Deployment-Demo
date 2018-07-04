import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Bookmark from '../Bookmark'
import BookmarkNew from '../BookmarkNew'
import { bookmarksAPI } from './../../Helpers/apiHelper'
import {setJwt, api} from './../../Api/init'




class Bookmarks extends Component {
    state = {
        bookmarks: []
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

    componentDidMount() {
        this.setBookmarks()
    }

    componentDidUpdate() {
        this.setBookmarks()
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
                
                <Route path={`${match.url}/id/:id`} component={Bookmark} />

                <Route path={`${match.url}/new`} component={BookmarkNew} />

            </div>

        )
    }
}

export default Bookmarks