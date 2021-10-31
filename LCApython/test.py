from types import UnionType
import unittest
import LCA
import DAG

class TestLCA(unittest.TestCase): 
    def emptyTest(self):
        root = None
        assert(LCA.findLCA(root,2,3))==None
        return

    def testTree(self):
        root = LCA.Node(1)
        root.left = LCA.Node(2)
        root.right = LCA.Node(3)
        root.left.left = LCA.Node(4)
        root.left.right = LCA.Node(5)
        root.right.left = LCA.Node(6)
        root.right.right = LCA.Node(7)

        assert(LCA.findLCA(root,2,3).key)==1
        assert(LCA.findLCA(root,2,7).key)==3
        assert(LCA.findLCA(root,6,2).key)==1
        return

#DAG test class
class TestDAG(unittest.TestCase):
    #Testing for empty graph
    def testemptylcaDAG(self):
        root = None
        LCA=DAG.DAG(root,16,509)
        assert LCA is None
    #Test for implemented Graph
    def testGraph(self):
        a = DAG.Node(1)
        b = DAG.Node(2)
        c = DAG.Node(3)
        d = DAG.Node(4)
        e = DAG.Node(5)

        #Test the predecessors
        a.pre = None
        b.pre = [a]
        c.pre = [a]
        d.pre = [a,b,c]
        e.pre = [a,c,d]

        #Testing the successors
        a.suc = [b,c,d,e]
        b.suc = [d]
        c.suc = [d,e]
        d.suc = [e]
        e.suc = None
        
        LCA = DAG.DAG(a,d,e)
     
        assert LCA == 3

    
if __name__ == '__main__':
    unittest.main()