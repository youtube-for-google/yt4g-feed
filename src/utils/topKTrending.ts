// src/utils/topKTrending.ts
// Simple generic MinHeap and helper function to get top‑K trending videos.

class MinHeap<T> {
  private data: T[] = [];
  constructor(private comparator: (a: T, b: T) => number) {}

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value: T) {
    this.data.push(value);
    this.bubbleUp();
  }

  pop() {
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length && bottom !== undefined) {
      this.data[0] = bottom;
      this.bubbleDown();
    }
    return top;
  }

  private bubbleUp() {
    let idx = this.data.length - 1;
    const element = this.data[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.data[parentIdx];
      if (this.comparator(element, parent) >= 0) break;
      this.data[parentIdx] = element;
      this.data[idx] = parent;
      idx = parentIdx;
    }
  }

  private bubbleDown() {
    let idx = 0;
    const length = this.data.length;

    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let smallest = idx;

      if (
        leftIdx < length &&
        this.comparator(this.data[leftIdx], this.data[smallest]) < 0
      )
        smallest = leftIdx;

      if (
        rightIdx < length &&
        this.comparator(this.data[rightIdx], this.data[smallest]) < 0
      )
        smallest = rightIdx;

      if (smallest === idx) break;

      [this.data[idx], this.data[smallest]] = [
        this.data[smallest],
        this.data[idx],
      ];
      idx = smallest;
    }
  }
}

export interface VideoItem {
  id: string;
  title: string;
  views: number;
  cat: string;
  channel?: string;
  thumb?: string;
}

// Returns top K videos sorted by highest view count
export function getTopKTrending(videos: VideoItem[], k: number): VideoItem[] {
  const heap = new MinHeap<VideoItem>((a, b) => a.views - b.views);
  for (const v of videos) {
    heap.push(v);
    if (heap.size() > k) heap.pop();
  }

  // Extract heap items descending order
  const result: VideoItem[] = [];
  while (heap.size()) {
    const item = heap.pop();
    if (item) result.unshift(item);
  }
  return result;
}
