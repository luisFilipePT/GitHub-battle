import axios from 'axios';

const getProfile = (username) => {
    return axios.get(`https://api.github.com/users/${username}`)
        .then(({ data }) => {
            return data;
        })
};

const getRepos = (username) => {
    return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
        .then(({ data }) => {
            return data;
        })
};

const getStarCount = (repos) => {
    return repos.reduce((count, repo) => {
        return count + repo.stargazers_count;
    }, 0);
};

const calculateScore = (profile, repos) => {
    const { followers } = profile;
    const totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
};

const handleError = (error) => {
    console.warn(error);
    return null;
};

const getUserData = (player) => {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then((data) => {
       const profile = data[0];
       const repos = data[1];

       return {
           profile,
           score: calculateScore(profile, repos)
       }
    })
};

const sortPlayers = (players) => {
  return players.sort((a,b) => {
      return b.score - a.score;
  })
};

const fetchPopularRepos = (language) => {
    const encodedURI = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}
        &sort=stars&order=desc&type=Repositories`);

    return axios.get(encodedURI).then(({ data }) => {
        return data.items;
    })
};

const battle = (players) => {
    return axios.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError)
};

export {
    fetchPopularRepos,
    battle
}

