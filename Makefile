cm:=/home/azz/tools/clion/bin/cmake/linux/x64/bin/cmake
ninja:=/home/azz/tools/clion/bin/ninja/linux/x64/ninja

deps:
	ls -la
mod-add:
	git submodule add git@github.com:eddyhdzg/leetcode-typescript-solutions mod/eddyhdzg-leetcode-typescript-solutions
	git submodule add git@github.com:sergeyleschev/leetcode-typescript mod/sergeyleschev-leetcode-typescript
	git submodule add https://github.com/LeetCode-in-TypeScript/LeetCode-in-TypeScript mod/leetcode-in-typescript
	git submodule add git@github.com:axross/leetcode-typescript.git mod/axross-leetcode-in-typescript


cmr:
	${cm} -S . -B cmake-build-release
cmd:
	${cm} -DCMAKE_PROJECT_TOP_LEVEL_INCLUDES=conan_provider.cmake -DCMAKE_BUILD_TYPE=Debug -S . -B cmake-build-debug
cmd2:
	${cm} -DCMAKE_PROJECT_TOP_LEVEL_INCLUDES=conan_provider.cmake \
	-DCMAKE_BUILD_TYPE=Debug -DCMAKE_MAKE_PROGRAM=${ninja} -G Ninja -S . \
	-B cmake-build-debug 


br:
	${cm} --build cmake-build-release --target pyss -j 22
bd: 
	export CMAKE_BUILD_PARALLEL_LEVEL=10 && ${cm} --build cmake-build-debug -j 10
rd:
	./cmake-build-debug/pauk/pauk --lits --niit
c:
	rm -rf cmake-build-debug/*	
	rm -rf cmake-build-release/*


git-acp:
	cd mod/juce && git acp || true
	git acp || true
git-pull:
	cd mod/juce && git pull || true
	git pull || true
git-push:
	cd mod/juce && git push || true
	git push || true


vst-rel:
	rm -rf ~/.vst3/magnetar.vst3
	cp -r cmake-build-debug/magnetar/magnetar_artefacts/Debug/VST3/magnetar.vst3 ~/.vst3/
 
 
