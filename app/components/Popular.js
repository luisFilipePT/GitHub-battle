import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

const SelectLanguage = ({ selectedLanguage, onSelect }) => {
    const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python'];
    return (
        <ul className='languages'>
            {languages.map(lang => <li
                style={lang === selectedLanguage ? { color: 'red' } : null}
                onClick={onSelect.bind(null, lang)}
                key={lang}>
                {lang}
            </li>)}
        </ul>
    )
};

const RepoGrid = (props) => {
    return (
        <ul className='popular-list'>
            {props.repos.map((repo, index) =>
                <li key={repo.name} className="popular-item">
                    <div className="popular-rank">#{index + 1}</div>
                    <ul className="space-list-items">
                        <li>
                            <img
                                className="avatar"
                                src={repo.owner.avatar_url}
                                alt={'Avatar for ' + repo.owner.login}
                            />
                        </li>
                        <li><a href={repo.html_url}>{repo.name}</a></li>
                        <li>@{repo.owner.login}</li>
                        <li>{repo.stargazers_count} stars</li>
                    </ul>
                </li>
            )}
        </ul>
    )
};

RepoGrid.propTypes = {
    repos: PropTypes.array,
};

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        fetchPopularRepos(lang).then(repos => {
            this.setState(() => {
                return {
                    repos,
                }
            })
        });
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos ? <p>Loading ...</p> : <RepoGrid repos={this.state.repos}/>}
            </div>
        )
    }
}

export default Popular;