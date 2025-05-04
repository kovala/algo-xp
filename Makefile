#cm:=/home/azz/tools/clion/bin/cmake/linux/x64/bin/cmake
cm:=cmake
ninja:=/home/azz/tools/clion/bin/ninja/linux/x64/ninja

cmp-group-anagrams:
	./cmake-build-release/algo-xp --benchmark:group-anagrams
	b=1 bun test ./arrays/group-anagrams.ts
cmp-binary-search:
	./cmake-build-release/algo-xp --benchmark:binary-search
	b=1 bun test ./arrays/binary-search.ts
cmp-two-sum:
	./cmake-build-release/algo-xp --benchmark:twosum
	b=1 bun test ./arrays/two-sum.ts
cmp-has-duplicate:
	./cmake-build-release/algo-xp --benchmark:has-duplicate
	b=1 bun test ./arrays/has-duplicate.ts

deps:
	ls -la

cmr:
	${cm} -DCMAKE_PROJECT_TOP_LEVEL_INCLUDES=conan_provider.cmake -DCMAKE_BUILD_TYPE=Release -S . -B cmake-build-release
cmd:
	${cm} -DCMAKE_PROJECT_TOP_LEVEL_INCLUDES=conan_provider.cmake -DCMAKE_BUILD_TYPE=Debug -S . -B cmake-build-debug
cmd2:
	${cm} -DCMAKE_PROJECT_TOP_LEVEL_INCLUDES=conan_provider.cmake \
	-DCMAKE_BUILD_TYPE=Debug -DCMAKE_MAKE_PROGRAM=${ninja} -G Ninja -S . \
	-B cmake-build-debug
br:
	${cm} --build cmake-build-release --target algo-xp -j 22
bd:
	export CMAKE_BUILD_PARALLEL_LEVEL=10 && ${cm} --build cmake-build-debug -j 10
rd:
	./cmake-build-debug/algo-xp --arrays
rr:
	./cmake-build-release/algo-xp --arrays
clean:
	rm -rf cmake-build-debug/*
	rm -rf cmake-build-release/*


git-mod-add:
	git submodule add git@github.com:eddyhdzg/leetcode-typescript-solutions mod/eddyhdzg-leetcode-typescript-solutions
	git submodule add git@github.com:sergeyleschev/leetcode-typescript mod/sergeyleschev-leetcode-typescript
	git submodule add https://github.com/LeetCode-in-TypeScript/LeetCode-in-TypeScript mod/leetcode-in-typescript
	git submodule add git@github.com:axross/leetcode-typescript.git mod/axross-leetcode-in-typescript
	git submodule add git@github.com:evanwashere/mitata.git mod/mitata
git-mod-init:
	git submodule init
	git submodule update --init
git-acp:
	#cd mod/juce && git acp || true
	git acp || true
git-pull:
	#cd mod/juce && git pull || true
	git pull || true
git-push:
	#cd mod/juce && git push || true
	git push || true
