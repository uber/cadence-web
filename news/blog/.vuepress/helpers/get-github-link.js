const getGithubLink = ({ owner, repo, tag }) => `https://github.com/${owner}/${repo}/releases/tag/${tag}`;

export default getGithubLink;
