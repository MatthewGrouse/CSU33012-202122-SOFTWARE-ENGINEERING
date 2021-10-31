class Node:
    def __init__(self,key) -> None:
        self.pre = []
        self.suc = []
        self.key = key

def DAG(root,x,y):
    if root == None:
        return None
    if root.key == x.key or root.key == y.key:
        return root.key
    if x.key == y.key:
        return x.key
    LCA=[]
    for i in range(len(x.pre)):
        for j in range(len(y.pre)):
            if(x.pre[i].key==y.pre[j].key):
                LCA.append(x.pre[i].key)
    if(LCA==[]):
        if(x.key>y.key):
            LCA.append(DAG(root,x.pre[0],y))
        else:
            LCA.append(DAG(root,x,y.pre[0]))

    return max(LCA)