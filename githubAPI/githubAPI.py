from github import Github
import json

#insert github authorized token into line below
g = Github("token")

usr = g.get_user()

dct = {
        'user': usr.login,
        'name': usr.name,
        'location':usr.location,
        'company':  usr.company
}

print("dict is " + json.dumps(dct))