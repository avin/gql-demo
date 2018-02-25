import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default class Navigation extends React.Component {
    render() {
        return (
            <div className="Navigation">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
