import React from 'react'
import { Whatshot  } from '@material-ui/icons';
import {Link} from 'react-router-dom'
function Navbar(){

    return(
        <div className='navbar'>
            <ul>

                <li><Link to="/" className='link'>Trending</Link> </li>
                <li> <Link to="/movie"  className='link'>Movie</Link> </li>
                <li><Link to="/tvseries" className='link'>TV Series</Link></li>
                <li><Link to="/search" className='link'>Search</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;