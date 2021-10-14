package LCAjava;
import static org.junit.Assert.*;

import org.junit.Test;

public class LCATest {

	@Test
	public void test() {
		LCA test = new LCA();
		assertEquals("First Test", "HelloWorld", test.helloWorld());;
	}
	
	@Test
	public void testCreateHead(){
		LCA lca = new LCA();
		lca.createHead('a',5);
		assertEquals("Create a head", 'a', lca.returnKey(lca.head));
	}
	
	@Test
	public void testAddNode(){
		LCA lca = new LCA();
		lca.createHead('d',0);
		lca.addNode('a',1);
		assertEquals("Add node A", 'a', lca.returnKey(lca.head.left));
		lca.addNode('h',2);
		assertEquals("Add node h", 'h', lca.returnKey(lca.head.right));
		lca.addNode('b',3);
		assertEquals("Add node b", 'b', lca.returnKey(lca.head.left.right));
		lca.addNode('f',4);
		assertEquals("Add node f", 'f', lca.returnKey(lca.head.right.left));
		lca.addNode('k',5);
		assertEquals("Add node k", 'k', lca.returnKey(lca.head.right.right));
	}
	
	@Test
	public void testFindNode(){
		LCA lca = new LCA();
		lca.createHead('d',0);
		assertEquals("Find head Node", 'd', lca.returnKey(lca.findNode('d')));
		lca.addNode('a',1);
		assertEquals("Find left Node", 'a', lca.returnKey(lca.findNode('a')));
		lca.addNode('h',2);
		assertEquals("Find right Node", 'h', lca.returnKey(lca.findNode('h')));
		lca.addNode('b',3);
		assertEquals("Find b Node", 'b', lca.returnKey(lca.findNode('b')));
		lca.addNode('f',4);
		assertEquals("Find f Node", 'f', lca.returnKey(lca.findNode('f')));
		lca.addNode('l',5);
		lca.addNode('c',6);
		lca.addNode('v',7);
		assertEquals("Find v Node", 'v', lca.returnKey(lca.findNode('v')));
	}
	
	@Test
	public void testDepth(){
		LCA lca = new LCA();
		lca.createHead('d',0);
		assertEquals("Depth of head", 0, lca.depth('d'));
		lca.addNode('a',1);
		assertEquals("Depth of a", 1, lca.depth('a'));
		lca.addNode('b',2);
		assertEquals("Depth of b", 2, lca.depth('b'));
		lca.addNode('c',3);
		assertEquals("Depth of c", 3, lca.depth('c'));
	}

	
	@Test
	public void testLCA(){
		LCA lca = new LCA();
		lca.createHead('f',0);		
		assertEquals("Should return head", lca.findNode('f'), lca.LCA(lca.findNode('f'), lca.findNode('f'), null));
		lca.addNode('c',1);
		lca.addNode('k',2);
		assertEquals("Should return head", lca.findNode('f'), lca.LCA(lca.findNode('f'), lca.findNode('c'), lca.findNode('k')));
		lca.addNode('a',3);
		lca.addNode('d',4);
		assertEquals("Should return c", lca.findNode('c'), lca.LCA(lca.findNode('f'), lca.findNode('a'), lca.findNode('d')));
		lca.addNode('v',5);
		assertEquals("Should return head", lca.findNode('f'), lca.LCA(lca.findNode('f'), lca.findNode('a'), lca.findNode('v')));
	}
	
	@Test 
	public void testPrint(){
		LCA lca = new LCA();
		lca.createHead('e',0);
		lca.addNode('b', 1);
		lca.addNode('f', 1);
		lca.addNode('a', 1);
		lca.addNode('g', 1);
		String tree = lca.prettyPrintKeys();
		String result = 
				"-e\n" +
				" |-b\n" +
				" | |-a\n" + 
				" | | |-null\n" +
				" | |  -null\n" +
				" |  -null\n" +
				"  -f\n" +
				"   |-null\n" +
				"    -g\n" +
				"     |-null\n" +
				"      -null\n";
		assertEquals("Print Tree", result, tree);
	}
}