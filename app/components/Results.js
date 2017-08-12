import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

const Profile = (props) => {
    const {avatar_url, login, name, location, company, followers, following, public_repos} = props.info;
    return (
        <PlayerPreview avatar={avatar_url} username={login}>
            <ul className="space-list-items">
                {name && <li>{name}</li>}
                {location && <li>{location}</li>}
                {company && <li>{company}</li>}
                <li>Followers: {followers}</li>
                <li>Following: {following}</li>
                <li>Public Repos: {public_repos}</li>
            </ul>
        </PlayerPreview>
    )
};

Profile.propTypes = {
    info: PropTypes.object.isRequired
};

const Player = (props) => {
    return (
        <div>
            <h1 className="header">{props.label}</h1>
            <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    )
};

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
};

export default class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        }
    }

    componentDidMount() {
        const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);
        battle([playerOneName, playerTwoName])
            .then((results) => {
                if (results === null) {
                    return {
                        error: 'There was an error. Check if both users exist on Github.',
                        loading: false
                    }
                }

                this.setState(() => {
                    return {
                        error: null,
                        winner: results[0],
                        loser: results[1],
                        loading: false
                    }
                });
            });
    }

    render() {
        const { error, winner, loser, loading } = this.state;

        if (loading) {
            return <p>Loading...</p>
        }

        if (error) {
            return <div>
                <p>{error}</p>
                <Link to='battle'>Reset</Link>
            </div>
        }

        return (
            <div className="row">
                <Player
                    label="Winner"
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label="Loser"
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}