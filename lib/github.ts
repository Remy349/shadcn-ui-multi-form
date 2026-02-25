interface GitHubRepoResponse {
  stargazers_count: number;
}

export const getGitHubRepoStars = async (): Promise<number | null> => {
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

  if (!GITHUB_ACCESS_TOKEN) return null;

  try {
    const response = await fetch(
      `https://api.github.com/repos/Remy349/shadcn-ui-multi-form`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return null;

    const data: GitHubRepoResponse = await response.json();

    return data.stargazers_count;
  } catch {
    return null;
  }
};
