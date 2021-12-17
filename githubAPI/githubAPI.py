from github import Github

#insert github authorized token into line below
g = Github("token")

usr = g.get_user()
print("user: " + usr.login)
if usr.name is not None:
    print("name: " + usr.name)
if usr.location is not None:
    print("location: " + usr.location)
if usr.company is not None:
    print("company: " + usr.company)