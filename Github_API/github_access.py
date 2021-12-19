import base64
from github import Github
from pprint import pprint
#inserting user name to access repo's
username = "MatthewGrouse"
g = Github()
user = g.get_user(username)

for repo in user.get_repos():
    print(repo)