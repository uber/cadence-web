const getGithubApi = ({ owner, repo, tag }) => `https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}`;

export default getGithubApi;
