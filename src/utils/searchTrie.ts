// Simple case‑insensitive Trie for prefix search
export class TrieNode {
  children: Record<string, TrieNode> = {};
  isEnd = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (const ch of word.toLowerCase()) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  searchPrefix(prefix: string): string[] {
    const results: string[] = [];
    let node = this.root;
    for (const ch of prefix.toLowerCase()) {
      if (!node.children[ch]) return results;
      node = node.children[ch];
    }
    this.collect(node, prefix.toLowerCase(), results, "");
    return results;
  }

  private collect(
    node: TrieNode,
    prefix: string,
    list: string[],
    suffix: string
  ) {
    if (node.isEnd) list.push(prefix + suffix);
    for (const ch in node.children) {
      this.collect(node.children[ch], prefix, list, suffix + ch);
    }
  }
}
