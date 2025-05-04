#include <utils.h>
#include <algo.h>
#include <queue>
#include <random>

#if defined(__APPLE__)
void u::jlog(json j) {
  std::cout << j << std::endl;
}
#endif

namespace utils {
  int rndNum(int min, int max) {
    static std::mt19937 gen(std::random_device{}());
    std::uniform_int_distribution dist(min, max);
    return dist(gen);;
  }

  std::vector<int> genRandomArray(size_t size, int min, int max) {
    // mersenne twister random engine
    static std::mt19937 gen(std::random_device{}());
    // distribution range
    std::uniform_int_distribution dist(min, max);
    std::vector<int> result(size);
    std::generate(result.begin(), result.end(), [&] { return dist(gen); });
    return result;
  }

  std::vector<int> genRandomIntArray(size_t size, int min, int max) {
    static std::mt19937 gen(std::random_device{}());
    std::uniform_int_distribution dist(min, max);

    std::vector<int> result(size);
    std::generate(result.begin(), result.end(), [&] { return dist(gen); });
    return result;
  }

  std::string genRandomStr(size_t length, const std::string_view& chars) {
    static std::mt19937 gen(std::random_device{}());
    std::uniform_int_distribution<> dist(0, chars.size() - 1);

    std::string result(length, '\0');
    std::ranges::generate(result, [&] { return chars[dist(gen)]; });
    return result;
  }

  std::vector<std::string> genRandomStrArray(size_t length, int min, int max) {
    std::vector<std::string> result(length);
    std::ranges::generate(result, [&] { return genRandomStr(rndNum(min, max)); });
    return result;
  }

  std::vector<int> findDuplicates(const std::vector<int>& arr) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;

    // for (int i = 0; i < arr.size(); i++) {
    //   int k = target - arr[i];
    //   if (minHeap.find(k) != minHeap.end()) {
    //     // If it does, return the indices
    //     return {minHeap[k], i};
    //   }
    //   minHeap[arr[i]] = i;
    // }
    return {};
  }
}
