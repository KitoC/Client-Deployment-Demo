import React from 'react'
import Modal from './../../UI/Modal'
import EditBookmark from './EditBookmark'





const Bookmark = (props) => {
    
    const { title, url, showEditForm, edit, toggleForm, destroy, modalRef, bookmarkShow, match } = props
    const {id} = match.params
    const bookmark = bookmarkShow(id)
    
    return (
        <div className="bookmark">
        { bookmark &&
            <React.Fragment>
                <div>
                    <h3>{bookmark.title}</h3>
                    <p>{bookmark.url}</p>
                    <div className="button-box">
                        <button onClick={() => toggleForm(id)}>Edit</button>
                        <button onClick={() => destroy(id)}>Delete</button>
                    </div>
                </div>

                <Modal ref={modalRef} showEditForm={showEditForm} >
                    <EditBookmark {...this.state} id={id} onSubmit={edit} titleChange={(e) => title(e)} urlChange={(e) => url(e)} />
                </Modal>
            </React.Fragment>

        }
        </div>
    ) 
}

export default Bookmark