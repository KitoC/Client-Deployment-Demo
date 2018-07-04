import React from 'react'

const Authentication = ({ authenticate, loginError, match }) => {

    return(
    <form className="form" onSubmit={(e) => {
        // e.preventDefault()
        // console.log(e, match.url)
        authenticate(e, match.url)
    }}>
        {loginError && <p>{loginError}</p>}
        <label>Email: <input type="email" name="email" /></label><br />
        <label>Password: <input type="password" name="password" /></label><br />
        <button type="submit">Login</button>
    </form>
    )
}




export default Authentication