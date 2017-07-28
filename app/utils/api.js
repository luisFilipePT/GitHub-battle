import axios from 'axios';

const fetchPopularRepos = (language) => {
    const encodedURI = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}
        &sort=stars&order=desc&type=Repositories`);

    return axios.get(encodedURI).then(({data}) => {
        return data.items;
    })
};

export {
  fetchPopularRepos,
}

