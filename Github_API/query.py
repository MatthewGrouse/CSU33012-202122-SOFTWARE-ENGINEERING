from github import Github

#Get repo information if user inputs access token
g = Github("access-token")

for repo in g.get_user().get_repos():
    print(repo.name)
    branch = repo.get_branch("main")
    print("{0:60} Most Recent {1:120}".format(str(repo), str(branch.commit)))